export const config = {
  // Default data
  currency: '₸',
  language: 'ru',
  email: 'seller@domain.com',
  phone: '+10123456789',
  whatsapp: '+11234567890',
  telegram: '@username',
  domains: [
    {
      name: 'example.com',
      expiration: '2024-04-24T18:55:00+06:00',
      price: 20000,
      increasePrice: 100,
      phone: false,
      whatsapp: '+12345678901',
      telegram: '@username1',
      hints: [
        'hint 1',
        'hint 2',
        'hint ...',
        'hint 100'
      ]
    },
    {
      name: 'example.net',
      expiration: '2024-04-25T00:00:00+06:00',
      price: 200000,
      increasePrice: 1500,
      email: 'another-seller@domain.com',
      language: 'en'
    },
    {
      name: 'example.org',
      expiration: '2024-04-26T12:00:00+06:00',
      price: 300000,
      increasePrice: 2000,
      whatsapp: false,
      telegram: '+12345678902',
      hints: [
        'hint 1',
        'hint 2'
      ]
    },
  ]
}