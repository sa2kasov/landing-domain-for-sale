import daysSinceOneYearAgo from './daysSinceOneYearAgo'

/**
 * Calculates a new value based on the given price according to the following rules:
 * - If the price is less than or equal to 200, returns the result of 25% of the price and rounded up to the nearest integer.
 * - If the price is greater than 200, returns a value determined by the following algorithm:
 *   - Start with a base value of 50 and a range of 100.
 *   - Repeatedly multiply the base and range by 10 until the price is less than or equal to the range.
 *   - Return the base value divided by 10.
 * @param {number} price - The price to use in the calculation.
 * @returns {number} The calculated value.
 */

function sumRange(price) {
  if (price <= 200) {
    return Math.ceil(price * 0.25)
  }
  let base = 50
  let range = 100
  while (price > range) {
    base *= 10
    range *= 10
  }
  return base / 10
}

/**
 * Calculate the current price and the date of the next price increase for a domain,
 * based on its expiration date and initial price, using a fixed domain increase price.
 *
 * @param {string} expirationDate - A string representing the expiration date of the domain, in ISO 8601 format.
 * @param {number} price - The initial price of the domain, in dollars.
 * @param {number} [domainIncreasePrice=1000] - The fixed price increase for the domain, in dollars.
 * @returns {{dateOfNextIncrease: Date, currentPrice: number}} An object containing the date of the next price increase and the current price for the domain, both in dollars.
 */

export function domainPrice(expirationDate, price, domainIncreasePrice = 1000) {
  expirationDate = new Date(Date.parse(expirationDate))
  price = Math.abs(Number(price))
  domainIncreasePrice = Math.abs(Number(domainIncreasePrice))

  if (domainIncreasePrice > price) {
    return Error('Error: The `increasePrice` is more than the domain `price`')
  }

  const currentDate = new Date()

  // If the domain has already expired, add 1 year until it is valid
  while (expirationDate <= currentDate) {
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
  }

  // Calculating the date of the next price increase
  // and the current price for today
  const rangeSum = sumRange(price)
  const numberOfIncrements = rangeSum * 2 / domainIncreasePrice
  const {oneYearAgo, daysInYear} = daysSinceOneYearAgo(expirationDate)
  const daysIncrement = daysInYear / numberOfIncrements
  const millisecondsToAdd = daysIncrement * 24 * 60 * 60 * 1000
  let timeIncrement = oneYearAgo
  let dateOfNextIncrease = expirationDate
  let currentPrice = price - rangeSum
  while(timeIncrement <= expirationDate){
    timeIncrement = new Date(timeIncrement.getTime() + millisecondsToAdd)
    currentPrice += domainIncreasePrice
    if(timeIncrement >= currentDate) {
      dateOfNextIncrease = timeIncrement
      break
    }
  }

  return {
    dateOfNextIncrease,
    currentPrice
  }
}