import express from "express";
import rateLimit from "express-rate-limit";
import {
  activateUser,
  forgotPassword,
  login,
  register,
  resetpassword,
  verifyRandomString,
  getPrivateData,
} from "../controllers/auth.js";
import { protectRoute } from "../middleware/auth.js";

// Set up rate limiter for private route
const privateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit headers
});

const router = express.Router();

router.post("/register", register);
router.get("/activate/:activationToken", activateUser);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.get("/verifyRandomString/:randomString", verifyRandomString);
router.put("/resetpassword/:randomString", resetpassword);
router.get("/private", privateLimiter, protectRoute, getPrivateData);

export const authRouter = router;
