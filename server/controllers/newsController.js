import { fetchAndSaveNews } from "../services/newsService.js";

export const fetchAndStoreNews = async (req, res) => {
  try {
    await fetchAndSaveNews();
    res.json({ message: "News fetched & stored successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news" });
  }
};
