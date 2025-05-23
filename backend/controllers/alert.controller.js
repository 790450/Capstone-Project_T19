import AlertSetting from '../models/Alertsetting.js';
import { sendEmailAlert } from '../utils/emailService.js';
import User from '../models/user.model.js';
import AlertHistory from '../models/AlertHistory.js';
import mongoose from 'mongoose';

// Send breaking news and save alert history
export const sendBreakingNews = async (userId, selectedCategories) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      return;
    }

    if (!selectedCategories || selectedCategories.length === 0) {
      console.log(`No categories specified for ${user.email}`);
      return;
    }

    const alertMessage = `'Thanks for setting your alert preferences!,
    Hello ${user.username}, here's your alert for categories: ${selectedCategories.join(', ')}.
    Thanks for Visiting NewsHunt.
         
        ©2025 News Hunt. All rights reserved.`

    // Send email
    await sendEmailAlert(user.email, 'Breaking News Alert!', alertMessage);
    console.log(` Email sent to ${user.email}`);

    // Save alert history
    const history = await AlertHistory.create({
      userId: user._id,
      category: selectedCategories.join(', '),
      message: alertMessage
    });

    console.log(' AlertHistory saved:', history);
  } catch (error) {
    console.error(' Failed to send alert:', error);
  }
};

//  Update user preferences and trigger alert if immediate
export const updateAlertPreference = async (req, res) => {
  try {
    const userId = req.user._id;
    const { selectedCategories, alertFrequency } = req.body;

    if (!userId || !selectedCategories || !alertFrequency) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const updatedPreference = await AlertSetting.findOneAndUpdate(
      { userId },
      { selectedCategories, alertFrequency },
      { new: true, upsert: true }
    );

    console.log(' Preferences updated:', updatedPreference);

    if (alertFrequency === 'immediate') {
      console.log(' Sending immediate alert...');
      await sendBreakingNews(userId, selectedCategories);
    }

    res.status(200).json({
      message: 'Preferences saved successfully.',
      updatedPreference
    });
  } catch (error) {
    console.error(' Error updating alert preference:', error);
    res.status(500).json({ message: 'Failed to update preferences.' });
  }
};

//  Scheduled alerts for daily/hourly (used by cron)
export const sendScheduledAlerts = async (frequency) => {
  try {
    const preferences = await AlertSetting.find({ alertFrequency: frequency });

    for (const pref of preferences) {
      await sendBreakingNews(pref.userId, pref.selectedCategories);
    }

    console.log(` Scheduled alerts sent for frequency: ${frequency}`);
  } catch (err) {
    console.error(' Error sending scheduled alerts:', err);
  }
};

// API Route handler for manual cron test via Postman
export const sendScheduledAlertsHandler = async (req, res) => {
  try {
    const { frequency } = req.query;

    if (!frequency) {
      return res.status(400).json({ message: 'Frequency query param is required' });
    }

    await sendScheduledAlerts(frequency);

    res.status(200).json({ message: `Scheduled alerts sent for ${frequency}` });
  } catch (err) {
    console.error(' Error in sendScheduledAlertsHandler:', err);
    res.status(500).json({ message: 'Failed to send scheduled alerts' });
  }
};

//  Fetch alert history for a user
export const getAlertHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const history = await AlertHistory.find({ userId }).sort({ createdAt: -1 });

    console.log(` Fetched ${history.length} alert(s) for user ${userId}`);
    res.status(200).json(history);
  } catch (err) {
    console.error(' Failed to fetch alert history:', err);
    res.status(500).json({ message: 'Failed to fetch alert history' });
  }
};
