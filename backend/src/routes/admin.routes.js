import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getAllJobs,
  getJobById,
  updateJobStatus,
  deleteJob
} from '../controllers/admin.controller.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Apply auth and admin middleware to all admin routes
router.use(authMiddleware, adminMiddleware);

// User management routes
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUserById)
  .patch(updateUserRole)
  .delete(deleteUser);

// Job management routes
router.route('/jobs')
  .get(getAllJobs);

router.route('/jobs/:id')
  .get(getJobById)
  .patch(updateJobStatus)
  .delete(deleteJob);

export default router;