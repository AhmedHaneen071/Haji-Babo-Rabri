export const SITE_NAME = 'Haji Babo Rabri';
export const SITE_TITLE = 'Haji Babo Rabri | Hyderabad Since 1974';
export const BASE_PATH = process.env.GH_PAGES_BASE_PATH || '';
export const SITE_DESCRIPTION =
  'Authentic Hyderabadi rabri, kheer, ras malai, khoya, desi ghee, and traditional dairy sweets from Haji Babo Rabri. Slow-cooked dairy delicacies since 1974.';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://haji-babo-rabri.web.app';
export const SITE_EMAIL = 'hajibaborabri@gmail.com';
export const SITE_PHONE_DISPLAY = '+92 312 2307882';
export const SITE_PHONE_TEL = '+923122307882';
export const SITE_PHONE_INTL = '923122307882';
export const SITE_ADDRESS =
  'Opposite Bombay Bakery, Salahuddin Road, Hyderabad, Pakistan';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: SITE_NAME,
  alternateName: 'HBR',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: SITE_PHONE_DISPLAY,
  email: SITE_EMAIL,
  image: `${SITE_URL}/favicon.svg`,
  logo: `${SITE_URL}/favicon.svg`,
  priceRange: 'PKR',
  foundingDate: '1974',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Opposite Bombay Bakery, Salahuddin Road',
    addressLocality: 'Hyderabad',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.396,
    longitude: 68.357,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  sameAs: [],
};