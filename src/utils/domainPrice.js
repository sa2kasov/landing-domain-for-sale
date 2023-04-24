import daysSinceOneYearAgo from './daysSinceOneYearAgo'

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
  domainIncreasePrice = Number(domainIncreasePrice)
  const currentDate = new Date()

  // If the domain has already expired, add 1 year until it is valid
  while (expirationDate <= currentDate) {
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
  }

  // Calculating the date of the next price increase
  // and the current price for today
  const numberOfIncrements = 100000 / domainIncreasePrice
  const {oneYearAgo, daysInYear} = daysSinceOneYearAgo(expirationDate)
  const daysIncrement = daysInYear / numberOfIncrements
  const millisecondsToAdd = daysIncrement * 24 * 60 * 60 * 1000
  let timeIncrement = oneYearAgo
  let dateOfNextIncrease = expirationDate
  let currentPrice = price - 50000
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