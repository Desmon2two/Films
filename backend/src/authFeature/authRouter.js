import express from "express";
import authController from "./authController.js";
import authenticate from "../middlewears/authMiddleware.js";
const router = express.Router();

router.post("/register", authController.registerUser);
router.delete("/users/me", authenticate,  authController.deleteUser);

export default router;
