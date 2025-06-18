import { JobApplication } from '../models/jobApplication.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { apiResponse } from '../utils/apiResponse.js';

// User applies to a job
const createJobApplication = asyncHandler(async (req, res) => {
    const {
        companyName,
        jobTitle,
        jobDescription,
        applicationLink,
        location,
        notes
    } = req.body;

    // Validate required fields
    if (!companyName || !jobTitle) {
        throw new ErrorResponse(400, "Company name and job title are required");
    }

    const jobApplication = await JobApplication.create({
        companyName,
        jobTitle,
        jobDescription,
        applicationLink,
        location,
        notes,
        user: req.user._id,  // Automatically set to current user
        status: 'Applied'    // Default status
    });

    return res
        .status(201)
        .json(new apiResponse(201, jobApplication, "Job application created successfully"));
});

// Get user's own applications
const getAllJobApplicationsForUser = asyncHandler(async (req, res) => {
    const { status } = req.query;
    
    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const jobApplications = await JobApplication.find(filter)
        .sort({ applicationDate: -1 });

    return res
        .status(200)
        .json(new apiResponse(200, jobApplications, "Job applications retrieved successfully"));
});

// Get one application (user can only access their own)
const getJobApplicationById = asyncHandler(async (req, res) => {
    const jobApplication = await JobApplication.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!jobApplication) {
        throw new ErrorResponse(404, "Job application not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, jobApplication, "Job application retrieved successfully"));
});

// Update application status (user can update their own)
const updateJobApplicationStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    
    if (!['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'].includes(status)) {
        throw new ErrorResponse(400, "Invalid status specified");
    }

    const jobApplication = await JobApplication.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user._id
        },
        { status },
        { new: true }
    );

    if (!jobApplication) {
        throw new ErrorResponse(404, "Job application not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, jobApplication, "Job application status updated successfully"));
});

// Delete application (user can delete their own)
const deleteJobApplication = asyncHandler(async (req, res) => {
    const jobApplication = await JobApplication.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });

    if (!jobApplication) {
        throw new ErrorResponse(404, "Job application not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, {}, "Job application deleted successfully"));
});

export {
    createJobApplication,
    getAllJobApplicationsForUser,
    getJobApplicationById,
    updateJobApplicationStatus,
    deleteJobApplication
};