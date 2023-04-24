import enTranslations from '../locales/en.json'
import ruTranslations from '../locales/ru.json'

const translations = {
  en: enTranslations,
  ru: ruTranslations,
}

let currentLanguage = 'ru' // default to English

export function setLanguage(language) {
  if (translations[language]) {
    currentLanguage = language
  } else {
    console.warn(`Unsupported language: ${language}`)
  }
}

export default function t(key, data = {}) {
  const translation = translations[currentLanguage][key]
  if (!translation) {
    console.warn(`Translation key '${key}' not found`)
    return key
  }

  // Checking if the translation contains HTML tags
  const hasHTML = /<\/?[a-z][\s\S]*>/i.test(translation);
  if (hasHTML) {
    // Interpolating any data variables in the translated HTML
    let interpolatedHTML = translation
    for (const [key, value] of Object.entries(data)) {
      const placeholder = `{${key}}`
      interpolatedHTML = interpolatedHTML.replace(placeholder, value)
    }

    // Returning the HTML as an object with a __html property
    return { __html: interpolatedHTML }
  }

  return translation.replace(/\{(.+?)\}/g, (match, p1) => data[p1])
}