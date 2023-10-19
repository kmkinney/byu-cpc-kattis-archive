import { readFileSync, writeFileSync } from "fs";
import { test } from "vitest";
import { z } from "zod";
import {
  fetchAllProblemListPages,
  parseIdsFromProblemList,
} from "~/server/api/services/problemListParser";

// This one will scrape live kattis
test.skip(
  "Fetch all problem ids",
  async () => {
    const res = await fetchAllProblemListPages();
    writeFileSync("problemListPages2.json", JSON.stringify(res));
  },
  { timeout: Infinity },
);

test("Parse out the problem info", async () => {
  const data = readFileSync("problemListAllPages.json", "utf-8");
  const pages = z.array(z.string()).parse(JSON.parse(data));
  const ids: string[] = [];
  for (const page of pages) {
    const res = parseIdsFromProblemList(page);
    ids.push(...res);
  }
  console.log(ids.length);
  writeFileSync("problemIds.json", JSON.stringify(ids));
  // const page = pages[0]!;
  // const res = await parseIdsFromProblemList(page);
});
