import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/news.css";
import { API_BASE_URL } from "../config/api";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/news`).then((res) => {
      setNews(res.data);
    });
  }, []);

  return (
    <div className="news-page">
      <h1>Latest Farming News</h1>

      <div className="news-grid">
        {news.map((item) => (
          <a
            key={item._id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="news-card"
          >
            <img
              src={item.image}
              alt={item.title}
              onError={(e) => {
                e.target.src = "/images/seed.webp";
              }}
            />
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>
                {item.source} • {new Date(item.publishedAt).toDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
