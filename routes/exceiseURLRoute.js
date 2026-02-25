import express from 'express';
const router = express.Router();
import {createShortCode, getAnalytics, redirectUrl}  from '../controllers/urlController.js';
import limiter from '../middlewares/rateLimitter.js'; 

router.post("/shorten", limiter, createShortCode);
router.get("/analytics/:shortCode", limiter, getAnalytics);
router.get("/redirect/:shortCode", redirectUrl);

export default router;