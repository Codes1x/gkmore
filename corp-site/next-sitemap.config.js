/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://seagroup-sochi.ru',
  generateRobotsTxt: false, // Используем свой robots.txt
  generateIndexSitemap: true,
  exclude: ['/api/*', '/_next/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
