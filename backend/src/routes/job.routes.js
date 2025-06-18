import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "../controllers/job.controller.js";

const router = Router();

// Apply JWT verification to all job routes
router.use(verifyJWT);

// Only admins can create, update, or delete jobs
router.post("/", verifyAdmin, createJobApplication);          
router.get("/", getAllJobApplications);                       
router.get("/:id", getJobApplicationById);                    
router.put("/:id", verifyAdmin, updateJobApplication);        
router.delete("/:id", verifyAdmin, deleteJobApplication);     

export default router;