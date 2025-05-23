import Alertsetting from "../models/Alertsetting.js";
import User from '../models/user.model.js';
import { sendEmailAlert } from '../utils/emailService.js';
import { errorHandler } from "../utils/error.js";
import { sendBreakingNews } from "./alert.controller.js";

// Get preferences
export const getPreferences = async (req, res, next) => {
  try {
    const settings = await Alertsetting.findOne({ userId: req.params.userId });
    if (!settings) return res.status(404).json({ message: "Preferences not found" });
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const { categories, frequency } = req.body;
    const userId = req.params.userId;

    // Validate incoming data
    if (!userId || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ message: "Invalid preferences. Please select at least one category." });
    }

    // Find user to send email later
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check for existing alert settings
    const existing = await Alertsetting.findOne({ userId });

    let savedPreference;

    if (existing) {
      // Update existing preferences
      savedPreference = await Alertsetting.findOneAndUpdate(
        { userId },
        {
          selectedCategories: categories,
          alertFrequency: frequency,
        },
        { new: true }
      );
    } else {
      // Create new preferences
      const newSetting = new Alertsetting({
        userId,
        selectedCategories: categories,
        alertFrequency: frequency,
      });
      savedPreference = await newSetting.save();
    }

    // Send immediate alert email if frequency is 'immediate'
    if (frequency === 'immediate') {
      await sendBreakingNews(userId, categories); 
    }

    res.status(existing ? 200 : 201).json(savedPreference);
  } catch (error) {
    next(error);
  }
}
