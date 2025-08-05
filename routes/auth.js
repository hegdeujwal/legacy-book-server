import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protectedRoute } from "../controllers/protectedController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", protectedRoute);

export default router;
