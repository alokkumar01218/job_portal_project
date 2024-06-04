import express from "express";
import { deleteJobs, getAllJobs, getMyJobs, getSingleJob, postJobs, updateJob } from "../controllers/jobController.js";
import { isAuth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuth, postJobs);
router.put("/update/:id", isAuth, updateJob);
router.delete("/delete/:id", isAuth, deleteJobs);
router.get("/getmyjobs", isAuth, getMyJobs);
router.get("/:id", isAuth, getSingleJob)

export default router;