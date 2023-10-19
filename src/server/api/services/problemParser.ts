import { load } from "cheerio";
import { db } from "~/server/db";

export async function addProblemInfoToDb(problemId: string) {
  const url = `https://open.kattis.com/problems/${problemId}`;
  const html = await fetchProblemHtml(url);
  const problemData = parseProblem(html);
  return await db.problem.upsert({
    where: { id: problemId },
    update: problemData,
    create: { id: problemId, ...problemData },
  });
}

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
