import { load } from "cheerio";

export async function fetchProblemHtml(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "Kevin Kinney problem info bot kevinmk712@gmail.com",
    },
  });
  const html = await response.text();
  return html;
}

export function parseProblem(html: string) {
  const $ = load(html);
  const difficulty = $("#metadata-tab")
    .find("span:contains('Difficulty')")
    .next()
    .children()
    .text();
  const title = $("title").text().split(" \u2013 ")[0]!;
  const body = $(".problembody")
    .text()
    .replace(/[\n]/g, "")
    .replace(/\s+/g, " ");
  return {
    difficulty: parseFloat(difficulty.replace(/[^0-9.]/g, "")),
    title,
    body,
  };
}
