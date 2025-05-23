export const fetchNews = async (category = 'general') => {
  try {
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/news?category=${category.toLowerCase()}`,
      {
        credentials: 'include', // if you use cookies or auth
      }
    );

    const data = await res.json();
    console.log("API Response from backend:", data);

    if (res.ok) {
      return data.articles || [];
    } else {
      console.error("API Error:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};
