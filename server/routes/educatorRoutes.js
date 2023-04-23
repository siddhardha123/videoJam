import express from "express";
import createEducator from "../controllers/educator/createEducator.js";
import getAllEducator from "../controllers/educator/getEducator.js";
import getEducatorById from "../controllers/educator/getEducatorById.js";
import deleteEducatorById from "../controllers/educator/deleteEducatorById.js";
const router = express.Router();

router.post("/addEducators",createEducator);
router.get("/getEducators",getAllEducator)
router.get("/getEducators/:id",getEducatorById)
router.delete("/deleteEducator/:id",deleteEducatorById)
export default router;