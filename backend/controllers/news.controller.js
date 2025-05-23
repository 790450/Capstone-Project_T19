import axios from 'axios';
import Alertsetting from "../models/Alertsetting.js";
import { errorHandler } from "../utils/error.js";

// ✅ General News Controller (missing before)
export const getGeneralNews = async (req, res, next) => {
  const { category = 'general' } = req.query;

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/news?category=${category}`, {
      params: {
        country: 'us',
        category,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.status(200).json({ articles: response.data.articles });
  } catch (error) {
    console.error('Error fetching general news:', error.message);
    next(errorHandler(500, 'Failed to fetch general news'));
  }
};

// ✅ Personalized News Controller
export const getPersonalizedNews = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const settings = await Alertsetting.findOne({ userId });

    if (!settings || !settings.selectedCategories || settings.selectedCategories.length === 0) {
      return res.status(400).json({ message: 'Please update your preferences first.' });
    }

     const apiKey = process.env.NEWS_API_KEY;
    console.log("API Key:", apiKey); // Debug log
    console.log("User's selected categories:", settings.selectedCategories);

    const categories = settings.selectedCategories;
    const allArticles = [];

    for (const category of categories) {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/news?category=${category}`, {
        params: {
          country: 'us',
          category,
          apiKey,
        },
      });

      if (response.data.articles) {
        allArticles.push(...response.data.articles);
      }
    }

    res.status(200).json({ articles: allArticles });
  } catch (error) {
    console.error('Error fetching personalized news:', error);
    next(errorHandler(500, 'Failed to fetch personalized news'));
  }
};
