/**
 * Calculates the number of days since a year ago, based on the given expiration date.
 *
 * @param {string | number | Date} expirationDate - The expiration date of the domain, in string, number or Date format.
 * @returns {{oneYearAgo: Date, daysInYear: number}} An object that contains the expiration date from one year ago and the number of days in that year.
 * */

export default function daysSinceOneYearAgo(expirationDate) {
  const oneYearAgo = new Date(expirationDate.getTime())
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const timeDiff = expirationDate.getTime() - oneYearAgo.getTime()
  return {
    oneYearAgo,
    daysInYear: timeDiff / (1000 * 60 * 60 * 24)
  }
}