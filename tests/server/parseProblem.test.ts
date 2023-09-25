import { test } from "vitest";
import fs from "fs";
import {
  fetchProblemHtml,
  parseProblem,
} from "~/server/api/services/problemParser";

test("parse a problem from the url", async () => {
  // const URL = "https://open.kattis.com/problems/1dfroggereasy?tab=metadata";
  // await fetchProblemHtml(URL);
  const html = fs.readFileSync("./test.html", "utf-8");
  const result = await parseProblem(html);
  console.log(result);
});
