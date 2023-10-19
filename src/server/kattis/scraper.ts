import "dotenv/config";
import ids from "./problemIds.json";
import { addProblemInfoToDb } from "../api/services/problemParser";

(async () => {
  for (let i = 0; i < ids.length; i++) {
    await addProblemInfoToDb(ids[i]!);
    console.log(`Added problem ${i}/${ids.length} id: ${ids[i]}`);
  }
})()
  .then(console.log)
  .catch(console.error);
