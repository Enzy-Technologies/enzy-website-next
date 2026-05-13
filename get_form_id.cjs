const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('request', request => {
    const url = request.url();
    if (url.includes('render-definition')) {
      console.log(url);
    }
  });
  await page.goto('https://npk7m.share-na2.hsforms.com/22fhW8wvoQ6WJl5kAaV2CFA');
  await browser.close();
})();
