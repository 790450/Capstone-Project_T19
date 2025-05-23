import React, { useEffect, useState } from 'react';
import { fetchNews } from '../lib/api/newsAPI';
import AdBanner from '@/components/shared/AdBanner';



const NewsArticles = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      console.log("Fetching news for:", category);
      const articles = await fetchNews(category);
      console.log("Fetched articles:", articles);
      setNews(articles);
      setLoading(false);
    };

    getNews();
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 bg-amber-100">Latest News - {category.toUpperCase()}</h2>

      <div className="mb-4">
        <label htmlFor="category" className="font-semibold mr-2 bg-amber-100" >Select Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="science">Science</option>
          <option value="Health">Health</option>
        </select>
      </div>

      {/* Marquee-style top 3 news */}
      {!loading && news.length > 0 && (
        <div className="overflow-hidden whitespace-nowrap bg-yellow-100 text-red-600 font-semibold py-2 px-4 rounded mb-4 animate-marquee">
          <div className="inline-block animate-marquee-track">
            {news.slice(0, 3).map((article, idx) => (
              <span key={idx} className="mr-12">
                📌 {article.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
          <React.Fragment key={index}> 
            <div
              key={index}
              className={`p-4 rounded-md shadow transition ${
  index < 3 ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-white'
}`}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Read more
              </a>
            </div>

            {index === 2 && (
               <AdBanner
               image="/mid-ad.jpg"
               link="https://your-ad-link.com"
               className="col-span-full my-6"

              />
             )}
          </React.Fragment>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsArticles;
