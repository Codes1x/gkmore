import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ГК Море - Оператор апарт-отелей в Сочи',
    short_name: 'ГК Море',
    description: 'Профессиональный оператор апарт-отелей в Сочи. Стабильная доходность и прозрачность управления.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1628',
    theme_color: '#0E7490',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

