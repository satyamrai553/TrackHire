import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/admin.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.use(verifyJWT, verifyAdmin);

// User management
router.get('/users', getAllUsers);
router.route('/users/:id')
  .get(getUserById)
  .patch(updateUserRole)
  .delete(deleteUser);

// Job management
router.route('/jobs').post(createJob);        // Create job
router.patch('/jobs/:id', updateJob);   // Update job
router.delete('/jobs/:id', deleteJob);  // Delete job

export default router;
