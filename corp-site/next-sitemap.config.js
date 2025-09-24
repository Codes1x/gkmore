/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: false, // Отключено - используем собственный robots.txt
  generateIndexSitemap: false, // Отключаем генерацию sitemap
  exclude: ['*'], // Исключаем все страницы из sitemap
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};


