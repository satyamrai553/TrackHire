import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createJobApplication,
  getAllJobApplicationsForUser,
  getJobApplicationById,
  updateJobApplicationStatus,
  deleteJobApplication,
} from "../controllers/jobApplication.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/", createJobApplication);                    // User applies to a job
router.get("/", getAllJobApplicationsForUser);             // Get user's applications
router.get("/:id", getJobApplicationById);                 // Get one application
router.put("/:id", updateJobApplicationStatus);            // Update status (maybe by admin later)
router.delete("/:id", deleteJobApplication);               // Delete application

export default router;
