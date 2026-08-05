import express from "express"
import authenticate from "../middleware/authMiddleware.js"
import videoController from "./videoController.js"
const router = express.Router()


router.post("/", authenticate, videoController.postVideo)

export default router