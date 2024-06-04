import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { employerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllaplications, postApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.get("/employer/getall", isAuth, employerGetAllApplications)
router.get("/jobseeker/getall", isAuth, jobSeekerGetAllaplications);
router.delete("/delete/:id", isAuth, jobSeekerDeleteApplication);

router.post("/post", isAuth, postApplication)



export default router;