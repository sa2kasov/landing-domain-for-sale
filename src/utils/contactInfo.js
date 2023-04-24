import { config } from '../config'

const emailChecking = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const formatPhoneNumber = phone => {
  // If phone number less than 11 digits
  if (!phone || phone.replace(/\D/g, '').length < 11) {
    return false
  }

  // Removing all non-digits from the phone number string
  return phone.replace(/\D(?<!\+)/g, '')
}

const telegramChecking = username => /^@[A-Za-z_]\w{4,31}$/.test(username)

export function contactInfo(data) {
  let
    email = false,
    phone = false,
    whatsapp = false,
    telegram = false

  // Email
  if (data.email !== false) {
    email = data.email && emailChecking(data.email) && data.email
    if (!email) {
      email = config.email && emailChecking(config.email) && config.email || false
    }
  }

  // Phone
  if (data.phone !== false) {
    phone = formatPhoneNumber(data.phone) || formatPhoneNumber(config.phone)
  }

  // WhatsApp
  if (data.whatsapp !== false) {
    whatsapp = formatPhoneNumber(data.whatsapp) || formatPhoneNumber(config.whatsapp)
  }

  // Telegram
  if (data.telegram !== false) {
    telegram = (telegramChecking(data.telegram) && data.telegram)
            || (telegramChecking(config.telegram) && config.telegram)
    if (!telegram) {
      telegram = formatPhoneNumber(data.telegram) || formatPhoneNumber(config.telegram)
    }
  }

  return { email, phone, whatsapp, telegram }
}