import { domainPrice } from './domainPrice'
import { contactInfo } from './contactInfo'
import { setLanguage } from './i18n.js'
import { config } from '../config'

/**
 * Calculates the current price and date of the next price increase for a domain.
 * @param {object} data - Optional parameter representing the domain's information.
 * @param {string} data.domainName - The name of the domain.
 * @param {string} data.expiration - The expiration date of the domain.
 * @param {number} data.price - The original price of the domain.
 * @param {number} data.increasePrice - The amount by which the price of the domain increases.
 * @returns {object} An object containing the domain's information along with its current price and date of next increase.
 * @returns {string} return.domainName - The name of the domain.
 * @returns {string} return.expiration - The expiration date of the domain.
 * @returns {number} return.price - The original price of the domain.
 * @returns {number} return.increasePrice - The amount by which the price of the domain increases.
 * @returns {number} return.currentPrice - The current price of the domain.
 * @returns {string} return.dateOfNextIncrease - The date of the next price increase for the domain.
 */

export function domainInfo(data = null) {
  let result = config.domains[0]
  if (data) {
    result = data
  }

  // Seller's contact info
  const contacts = contactInfo(result)

  // Currency and interface language
  const currency = result['currency'] || config.currency || '$'
  const language = result['language'] || config.language || 'en'
  setLanguage(language)

  // Domain price and expiration date
  let
    currentPrice = Number(result.price) || 100000,
    dateOfNextIncrease = new Date()

  if (result.expiration && result.price && result.increasePrice) {
    ({ currentPrice, dateOfNextIncrease } = domainPrice(
      result.expiration,
      result.price,
      result.increasePrice
    ))
  } else {
    result.price = 100000
    result.increasePrice = 1000
    result.timer = false
  }

  return {
    ...result,
    ...contacts,
    language,
    currency,
    currentPrice,
    dateOfNextIncrease
  }
}