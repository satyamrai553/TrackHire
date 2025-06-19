import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createJobApplication,
  getAllJobApplicationsForUser,
  getJobApplicationById,
  deleteJobApplication,
} from "../controllers/jobApplication.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/", createJobApplication);                    // User applies to a job
router.get("/", getAllJobApplicationsForUser);             // Get user's applications
router.get("/:id", getJobApplicationById);                 // Get one application
router.delete("/:id", deleteJobApplication);               // Delete application

export default router;
