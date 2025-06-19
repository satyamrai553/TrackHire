import { JobApplication } from '../models/jobApplication.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { apiResponse } from '../utils/apiResponse.js';

// Create a job application (auth or guest)
const createJobApplication = asyncHandler(async (req, res) => {
  const { job, name, email, coverLetter } = req.body;

  if (!job || !coverLetter) {
    throw new ErrorResponse(400, "Job ID and cover letter are required");
  }

  // Authenticated user: use user ID, skip name/email
  const applicationData = {
    job,
    coverLetter,
    submittedAt: new Date(),
  };

  if (req.user) {
    applicationData.user = req.user._id;
  } else {
    if (!name || !email) {
      throw new ErrorResponse(400, "Name and email are required for guest submissions");
    }
    applicationData.name = name;
    applicationData.email = email;
  }

  const jobApplication = await JobApplication.create(applicationData);

  return res.status(201).json(
    new apiResponse(201, jobApplication, "Job application submitted successfully")
  );
});

// Get all applications for a job (admin or job owner)
const getApplicationsForJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;

  const applications = await JobApplication.find({ job: jobId })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(200, applications, "Applications retrieved successfully")
  );
});

// Get all applications for current user (authenticated only)
const getAllJobApplicationsForUser = asyncHandler(async (req, res) => {
  const applications = await JobApplication.find({ user: req.user._id })
    .populate('job')
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(200, applications, "Your applications retrieved successfully")
  );
});

// Get a single application by ID (for owner or admin)
const getJobApplicationById = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id)
    .populate('job')
    .populate('user', 'name email');

  if (!application) {
    throw new ErrorResponse(404, "Application not found");
  }

  // If not admin, ensure it's the user's own application
  if (req.user && !req.user.isAdmin && application.user?.toString() !== req.user._id.toString()) {
    throw new ErrorResponse(403, "You are not authorized to access this application");
  }

  return res.status(200).json(
    new apiResponse(200, application, "Application retrieved successfully")
  );
});

// Delete an application (owner only)
const deleteJobApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!application) {
    throw new ErrorResponse(404, "Application not found or not yours");
  }

  return res.status(200).json(
    new apiResponse(200, {}, "Application deleted successfully")
  );
});

export {
  createJobApplication,
  getApplicationsForJob,
  getAllJobApplicationsForUser,
  getJobApplicationById,
  deleteJobApplication,
};
