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

router.post("/addstory", protectRoute, addStory);
router.get("/getAllStories", getAllStories);
router.get("/:id", protectRoute, getStoryById);
router.put("/:id", protectRoute, editStory);
router.delete("/:id", protectRoute, deleteLimiter, deleteStory);

export const storyRouter = router;
