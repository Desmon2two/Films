import express from "express";
import authController from "./authController.js";
const router = express.Router();

router.post("/register", authController.registerUser);

export default router;
