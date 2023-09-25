import puppeteer from "puppeteer";

(async () => {
  const URL = "https://open.kattis.com/problems?f_language=en";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Kevin Kinney (kevin-kinney) - Kattis Scraper for School Club. Email: kevinmk712@gmail.com",
  );
})();
