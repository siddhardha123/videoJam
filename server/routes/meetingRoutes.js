import express from "express";
import addMeeting from "../controllers/meetings/addMeeting.js";
import getMeetingsById from "../controllers/meetings/getMeetingById.js";
import addMaterial from "../controllers/materials/addMaterial.js";
import getMaterialsById from "../controllers/materials/getMaterialsByid.js";
const router = express.Router();

router.post("/addMeeting",addMeeting);
router.post("/addMaterial",addMaterial);
router.get("/getMeetings/:educatorId",getMeetingsById);
router.get("/getMaterials/:educatorId",getMaterialsById);
export default router;