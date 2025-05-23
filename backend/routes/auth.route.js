import express from 'express'
import { google, signin, signup } from '../controllers/auth.controller.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/", google)

router.get("/signin", (req, res) => {
  res.status(405).json({ message: "GET method not supported on /signin. Use POST." });
})


export default router