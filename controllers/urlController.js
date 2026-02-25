import generateCode from "../utils/generateCode.js";
import validateUrl from "../utils/validateUrl.js";

const urlStore = new Map(); // In-memory storage

export const createShortCode = (req, res, next) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl || validateUrl(originalUrl) === false) {
            return res.status(400).json({ error: "Invalid URL provided" });
        }

        for (let [key, value] of urlStore.entries()) {
            if (value.originalUrl === originalUrl) {
                return res.status(200).json({
                    shortCode: key,
                    isValid: true,
                });
            }
        }

        const shortCode = generateCode();

        urlStore.set(shortCode, {
            originalUrl,
            createdAt: new Date(),
            clickCount: 0,
        });

       return res.status(201).json({
            shortUrl: `http://localhost:5200/${shortCode}`,
        });
    } catch (error) {
        next(error);
    }
};

export const redirectUrl  = (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const urlEntry = urlStore.get(shortCode);
        if (!urlEntry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        urlEntry.clickCount += 1;
       return res.redirect(urlEntry.originalUrl);
    } catch (error) {
        next(error);
    }
};

export const getAnalytics    = (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const urlEntry = urlStore.get(shortCode);
        if (!urlEntry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        const analytics = {
            originalUrl: urlEntry.originalUrl,
            createdAt: urlEntry.createdAt,
            clickCount: urlEntry.clickCount,
        };

       return res.status(200).json(analytics);
    } catch (error) {
        next(error);
    }
};
