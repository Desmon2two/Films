import express from "express";
import authenticate from "../../middlewears/authMiddleware.js";
import videoController from "./videoController.js";
const router = express.Router();

router.get("/", videoController.showVideos);
router.get("/:id", videoController.getVideo);

router.post("/", authenticate, videoController.postVideo);

export default router;
