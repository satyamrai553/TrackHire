import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { ErrorResponse } from "../utils/errorResponse.js";


const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 }).lean();

  return res
    .status(200)
    .json(new apiResponse(200, jobs, "All jobs retrieved successfully"));
});


const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id).lean();

  if (!job) {
    throw new ErrorResponse(404, "Job not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, job, "Job retrieved successfully"));
});

export { getAllJobs, getJobById };
