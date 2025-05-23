import express from 'express';
import { getAlertHistory, updateAlertPreference, sendScheduledAlerts } from '../controllers/alert.controller.js';


const router = express.Router();
router.post('/send',  sendScheduledAlerts);
router.get('/history/:userId', getAlertHistory);

export default router;
