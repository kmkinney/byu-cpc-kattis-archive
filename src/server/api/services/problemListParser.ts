// import { load } from "cheerio";
import puppeteer from "puppeteer";

const NUM_PROBLEM_PAGES = 39;

export async function fetchAllProblemListPages() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Kevin Kinney (kevin-kinney) - Kattis Scraper for School Club. Email: kevinmk712@gmail.com",
  );
  const pages: string[] = [];
  for (let i = NUM_PROBLEM_PAGES; i <= NUM_PROBLEM_PAGES; i++) {
    const url = `https://open.kattis.com/problems?f_language=en&page=${i}`;
    await page.goto(url);
    const html = await page.content();
    pages.push(html);
  }
  await browser.close();
  return pages;
}

export function parseIdsFromProblemList(page: string) {
  const matcher = /href="\/problems\/([^"\/]*)"/g;
  const matches = page.matchAll(matcher);
  const ids: string[] = [];
  for (const match of matches) {
    if (match[1]) {
      ids.push(match[1]);
    }
  }
  return ids;
}
