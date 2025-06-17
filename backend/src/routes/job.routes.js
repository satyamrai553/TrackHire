import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "../controllers/job.controller.js";

const router = Router();

// All routes are protected by JWT
router.use(verifyJWT);

router.post("/", createJobApplication);                 // Create a new job
router.get("/", getAllJobApplications);                 // Get all jobs (with filters & sorting)
router.get("/:id", getJobApplicationById);              // Get job by ID
router.put("/:id", updateJobApplication);               // Update job by ID
router.delete("/:id", deleteJobApplication);            // Delete job by ID

export default router;
