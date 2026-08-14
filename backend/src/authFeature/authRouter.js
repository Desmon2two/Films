import express from "express";
import authController from "./authController.js";
import authenticate from "../middlewears/authMiddleware.js";
const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.refreshToken);
router.delete("/users/me", authenticate,  authController.deleteUser);
router.get("/users/me", authenticate, authController.getCurrentUser)
router.patch("/users/me", authenticate, authController.patchUser)

export default router;
