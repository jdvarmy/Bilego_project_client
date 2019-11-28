const sm = require('sitemap');
const fs = require('fs');

const config = require('./config.json');

const sitemap = sm.createSitemap({
  hostname: 'https://example.com',
  cacheTime: 600000,
  urls: config.siteMapUrls.map(url => ({ url, changefreq: 'monthly', priority: 0.8 })),
});

fs.writeFileSync('public/static/sitemap.xml', sitemap.toString());
