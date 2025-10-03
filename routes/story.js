import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { addStory, deleteStory, editStory, getAllStories, getStoryById } from "../controllers/story.js";
// Import rate limiter middleware
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiter: allow max 5 deletes per minute per IP
const deleteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Too many delete requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Rate limiter: allow max 10 edits per minute per IP
const editLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: "Too many edit requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter: allow max 100 reads per 15 minutes per IP
const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests for stories from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/addstory", protectRoute, addStory);
router.get("/getAllStories", readLimiter, getAllStories);
router.get("/:id", protectRoute, readLimiter, getStoryById);
router.put("/:id", protectRoute, editLimiter, editStory);
router.delete("/:id", protectRoute, deleteLimiter, deleteStory);

export const storyRouter = router;
