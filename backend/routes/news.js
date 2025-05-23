import express from 'express';
import { getPersonalizedNews, getGeneralNews } from "../controllers/news.controller.js";

const router = express.Router();

// Route for general news (with category query)
router.get('/', getGeneralNews);

// Route for personalized news based on user preferences
router.get('/personalized/:userId', getPersonalizedNews);

export default router;
