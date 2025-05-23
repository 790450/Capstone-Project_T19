import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors";
import cron from 'node-cron';
import { sendScheduledAlerts } from './controllers/alert.controller.js';

import authRoutes from './routes/auth.route.js'
import userRoutes  from './routes/user.route.js'
import newsRoutes from './routes/news.js';
import alertSettingsRoutes from './routes/alertsettings.js'
import alertRoutes from './routes/alert.route.js'






dotenv.config()

const app = express()


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));

app.use(express.json());

app.use(cookieParser());

mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("Database is connected")
}).catch((err) =>{
    console.log(err)
})
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use('/api/news', newsRoutes);
app.use("/api/alertsettings", alertSettingsRoutes)
app.use('/api/alert', alertRoutes);


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server Error "

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})


cron.schedule('0 * * * *', () => {
  console.log(' Running scheduled hourly email alerts...');
  sendScheduledAlerts('hourly');
});

// Daily alerts at 9 AM
cron.schedule('0 9 * * *', () => {
  console.log(' Sending daily email alerts...');
  sendScheduledAlerts('daily');
});