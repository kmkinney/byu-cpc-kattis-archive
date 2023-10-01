import { test } from "vitest";
import fs from "fs";
import { parseProblem } from "~/server/api/services/problemParser";

test("parse a problem from the url", async () => {
  const html = fs.readFileSync("./tests/test.html", "utf-8");
  const result = parseProblem(html);
  console.log(result);
});
