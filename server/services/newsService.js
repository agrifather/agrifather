import axios from "axios";
import News from "../models/News.js";

export const fetchAndSaveNews = async () => {
  try {
    const fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // 1. Define the requests without "awaiting" them immediately
    const newsApiPromise = axios.get(
      `https://newsapi.org/v2/everything?q=agriculture OR farming OR crops&language=en&from=${fromDate}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`,
      { timeout: 8000 }
    );

    const gNewsPromise = axios.get(
      `https://gnews.io/api/v4/search?q=farming&lang=en&token=${process.env.GNEWS_API_KEY}`,
      { timeout: 8000 }
    );

    // 2. Fire both at once and wait for them to finish (successfully or not)
    const results = await Promise.allSettled([newsApiPromise, gNewsPromise]);

    const allArticles = [];

    // 3. Collect articles only from the requests that succeeded
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        const articles = result.value.data?.articles || [];
        allArticles.push(...articles);
      } else {
        const source = index === 0 ? "NewsAPI" : "GNews";
        console.error(`⚠️ ${source} failed:`, result.reason.message);
      }
    });

    if (allArticles.length === 0) {
      console.log("📭 No articles fetched from any source.");
      return;
    }

    let savedCount = 0;
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    // 4. Processing Loop
    for (const article of allArticles) {
      if (savedCount >= 50) break;
      if (!article.title || !article.url) continue;

      const publishedDate = new Date(article.publishedAt);
      if (publishedDate < twoDaysAgo) continue;

      await News.updateOne(
        { url: article.url },
        {
          title: article.title,
          description: article.description,
          image: article.urlToImage || article.image,
          url: article.url,
          source: article.source?.name || article.source,
          publishedAt: article.publishedAt,
        },
        { upsert: true }
      );

      savedCount++;
    }

    // 5. Cleanup Database
    const count = await News.countDocuments();
    if (count > 100) {
      const extra = count - 100;
      const oldNews = await News.find().sort({ publishedAt: 1 }).limit(extra);
      const ids = oldNews.map((n) => n._id);
      await News.deleteMany({ _id: { $in: ids } });
    }

    console.log(`✅ News updated. Processed this run: ${savedCount}`);
  } catch (err) {
    // This now only catches errors in processing logic, not the API calls themselves
    console.error("❌ CRITICAL NEWS SERVICE ERROR:", err.message);
  }
};