import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardPersonalizedNews = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPersonalizedNews = async () => {
      try {
        const res = await fetch(`/api/news/personalized/${currentUser._id}`);
        const data = await res.json();

        console.log("Personalized news response:", data);

        if (!res.ok) {
          // This handles 400 and other error statuses
          setError(data.message || "Failed to fetch personalized news.");
          setArticles([]);
        } else {
          setArticles(data.articles || []);
        }
      } catch (err) {
        console.error("Error fetching personalized news", err);
        setError("Something went wrong. Please try again later.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalizedNews();
  }, [currentUser]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Personalized News</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : articles.length === 0 ? (
        <p>No news found. Please update your preferences.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((article, i) => (
            <div key={i} className="bg-white p-4 shadow rounded">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt=""
                  className="w-full h-40 object-cover mb-2"
                />
              )}
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-sm mt-1">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm mt-2 block"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPersonalizedNews;
