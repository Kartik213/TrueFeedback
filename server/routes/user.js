import express from "express";
import { getUser, sendMessage, setAcceptance, deleteMessage, suggestMessage } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getUser);
router.post("/send-message", sendMessage);
router.patch("/messages", verifyToken, setAcceptance);
router.delete("/:messageId", verifyToken, deleteMessage);
router.get("/suggestions", suggestMessage);

export default router;
