import express from "express";
import addMeeting from "../controllers/meetings/addMeeting";
const router = express.Router();

router.post("/addMeeting",addMeeting);
export default router;