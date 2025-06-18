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
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

// Apply both middlewares to all admin routes
router.use(verifyJWT, verifyAdmin);

// User management routes
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUserById)
  .patch(updateUserRole)
  .delete(deleteUser);

// Job management routes (admin-only versions)
router.route('/jobs')
  .get(getAllJobs);

router.route('/jobs/:id')
  .get(getJobById)
  .patch(updateJobStatus)
  .delete(deleteJob);

export default router;