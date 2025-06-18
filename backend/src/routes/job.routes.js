import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getAllJobs);    // View all jobs
router.get("/:id", getJobById); // View job by ID

export default router;
