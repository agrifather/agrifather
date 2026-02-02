import cron from "node-cron";
import { fetchAndSaveNews } from "../services/newsService.js";

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily news cron...");
  await fetchAndSaveNews();
});
