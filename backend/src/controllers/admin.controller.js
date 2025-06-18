//admin.controllers.js
import { User } from '../models/user.model.js';
import { Job } from '../models/job.model.js';  // Import the Job model
import { ErrorResponse } from '../utils/errorResponse.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// User Management (unchanged)
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

  // Delete all jobs posted by this user
  await Job.deleteMany({ postedBy: req.params.id });

  res.status(200).json(new apiResponse(200, {}, "User deleted successfully"));
});

// Job Management (updated to match the Job model)
export const createJob = asyncHandler(async (req, res) => {
  const {
    companyName,
    jobTitle,
    jobDescription,
    jobType,
    location,
    applicationLink
  } = req.body;

  const job = await Job.create({
    companyName,
    jobTitle,
    jobDescription,
    jobType,
    location,
    applicationLink,
    postedBy: req.user._id  // The admin user creating the job
  });

  res.status(201).json(new apiResponse(201, job, "Job created successfully"));
});

export const updateJob = asyncHandler(async (req, res) => {
  const {
    companyName,
    jobTitle,
    jobDescription,
    jobType,
    location,
    applicationLink
  } = req.body;

  const job = await Job.findByIdAndUpdate(
    req.params.id,
    {
      companyName,
      jobTitle,
      jobDescription,
      jobType,
      location,
      applicationLink
    },
    { new: true }
  );

  if (!job) {
    throw new ErrorResponse(404, "Job not found");
  }

  res.status(200).json(new apiResponse(200, job, "Job updated successfully"));
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  
  if (!job) {
    throw new ErrorResponse(404, "Job not found");
  }

  res.status(200).json(new apiResponse(200, {}, "Job deleted successfully"));
});