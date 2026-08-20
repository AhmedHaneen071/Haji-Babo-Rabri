import type { MetadataRoute } from 'next';
import { BASE_PATH, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Haji Babo Rabri',
    description: SITE_DESCRIPTION,
    start_url: `${BASE_PATH}/`,
    display: 'standalone',
    background_color: '#041A12',
    theme_color: '#041A12',
    lang: 'en',
    categories: ['food', 'shopping', 'business'],
    icons: [
      { src: `${BASE_PATH}/icons/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${BASE_PATH}/icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${BASE_PATH}/icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: `${BASE_PATH}/icons/icon.svg`, sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}