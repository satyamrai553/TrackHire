import { User } from '../models/user.models.js';
import { JobApplication } from '../models/jobApplication.models.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// User Management
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password -refreshToken');
  res.status(200).json(new apiResponse(200, users, "All users retrieved successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -refreshToken');
  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }
  res.status(200).json(new apiResponse(200, user, "User retrieved successfully"));
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  
  if (!['admin', 'customer', 'seller'].includes(role)) {
    throw new ErrorResponse(400, "Invalid role specified");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password -refreshToken');

  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  res.status(200).json(new apiResponse(200, user, "User role updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  // Optionally: Delete all job applications associated with this user
  await JobApplication.deleteMany({ user: req.params.id });

  res.status(200).json(new apiResponse(200, {}, "User deleted successfully"));
});

// Job Management
export const getAllJobs = asyncHandler(async (req, res) => {
  const { status, user } = req.query;
  
  const filter = {};
  if (status) filter.status = status;
  if (user) filter.user = user;

  const jobs = await JobApplication.find(filter)
    .populate('user', 'fullname email phoneNumber')
    .sort({ appliedDate: -1 });

  res.status(200).json(new apiResponse(200, jobs, "All job applications retrieved successfully"));
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await JobApplication.findById(req.params.id)
    .populate('user', 'fullname email phoneNumber');

  if (!job) {
    throw new ErrorResponse(404, "Job application not found");
  }

  res.status(200).json(new apiResponse(200, job, "Job application retrieved successfully"));
});

export const updateJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'].includes(status)) {
    throw new ErrorResponse(400, "Invalid status specified");
  }

  const job = await JobApplication.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate('user', 'fullname email phoneNumber');

  if (!job) {
    throw new ErrorResponse(404, "Job application not found");
  }

  res.status(200).json(new apiResponse(200, job, "Job status updated successfully"));
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await JobApplication.findByIdAndDelete(req.params.id);
  
  if (!job) {
    throw new ErrorResponse(404, "Job application not found");
  }

  res.status(200).json(new apiResponse(200, {}, "Job application deleted successfully"));
});