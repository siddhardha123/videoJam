import express from "express";
import addMeeting from "../controllers/meetings/addMeeting.js";
import getMeetingsById from "../controllers/meetings/getMeetingById.js";
const router = express.Router();

router.post("/addMeeting",addMeeting);
router.get("/getMeetings/:educatorId",getMeetingsById);
export default router;