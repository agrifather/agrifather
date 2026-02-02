import axios from "axios";
import News from "../models/News.js";

export const fetchAndSaveNews = async () => {
  try {
    const fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const newsApiRes = await axios.get(
      `https://newsapi.org/v2/everything?q=agriculture OR farming OR crops&language=en&from=${fromDate}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`,
      { timeout: 8000 }
    );

    const gNewsRes = await axios.get(
      `https://gnews.io/api/v4/search?q=farming&lang=en&token=${process.env.GNEWS_API_KEY}`,
      { timeout: 8000 }
    );

    const allArticles = [
      ...(newsApiRes.data?.articles || []),
      ...(gNewsRes.data?.articles || []),
    ];

    let savedCount = 0;
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    for (const article of allArticles) {
      if (savedCount >= 30) break;

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

    const count = await News.countDocuments();
    if (count > 50) {
      const extra = count - 50;
      const oldNews = await News.find().sort({ publishedAt: 1 }).limit(extra);
      const ids = oldNews.map(n => n._id);
      await News.deleteMany({ _id: { $in: ids } });
    }

    console.log(`✅ News updated. Saved: ${savedCount}`);
  } catch (err) {
    console.error("❌ NEWS SERVICE ERROR:", err.message);
  }
};
