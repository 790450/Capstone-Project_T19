export const fetchNews = async (category = 'General') => {
  try {
    const res = await fetch(
     `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`

    )

    const data = await res.json();
    console.log("API Response:", data);

    if (data.status === 'ok') {
      return data.articles;
    } else {
      console.error("API Error:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};
