import { JobApplication } from '../models/jobApplication.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { apiResponse } from '../utils/apiResponse.js';

const createJobApplication = asyncHandler(async (req, res) => {
    const {
        companyName,
        jobTitle,
        applicationDate,
        status,
        jobDescription,
        applicationLink,
        location,
        notes
    } = req.body;

    // Validate required fields
    if (!companyName || !jobTitle || !applicationDate || !status) {
        throw new ErrorResponse(400, "Company name, job title, application date, and status are required");
    }

    const jobApplication = await JobApplication.create({
        companyName,
        jobTitle,
        applicationDate,
        status,
        jobDescription,
        applicationLink,
        location,
        notes,
        user: req.user._id
    });

    return res
        .status(201)
        .json(new apiResponse(201, jobApplication, "Job application created successfully"));
});

const getAllJobApplications = asyncHandler(async (req, res) => {
    // Extract query parameters for filtering and sorting
    const { status, sortBy, sortOrder } = req.query;
    
    // Build the query object
    const query = { user: req.user._id };
    if (status) query.status = status;

    // Build the sort object
    const sortOptions = {};
    if (sortBy) {
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
        sortOptions.applicationDate = -1; // Default sort by application date (newest first)
    }

    const jobApplications = await JobApplication.find(query)
        .sort(sortOptions)
        .lean();

    return res
        .status(200)
        .json(new apiResponse(200, jobApplications, "Job applications retrieved successfully"));
});

const getJobApplicationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const jobApplication = await JobApplication.findOne({
        _id: id,
        user: req.user._id
    });

    if (!jobApplication) {
        throw new ErrorResponse(404, "Job application not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, jobApplication, "Job application retrieved successfully"));
});

const updateJobApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // Validate that there are updates
    if (!updates || Object.keys(updates).length === 0) {
        throw new ErrorResponse(400, "No update data provided");
    }

    const jobApplication = await JobApplication.findOneAndUpdate(
        { _id: id, user: req.user._id },
        updates,
        { new: true, runValidators: true }
    );

    if (!jobApplication) {
        throw new ErrorResponse(404, "Job application not found or you don't have permission to update it");
    }

    return res
        .status(200)
        .json(new apiResponse(200, jobApplication, "Job application updated successfully"));
});

const deleteJobApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const jobApplication = await JobApplication.findOneAndDelete({
        _id: id,
        user: req.user._id
    });

    if (!jobApplication) {
        throw new ErrorResponse(404, "Job application not found or you don't have permission to delete it");
    }

    return res
        .status(200)
        .json(new apiResponse(200, {}, "Job application deleted successfully"));
});

export {
    createJobApplication,
    getAllJobApplications,
    getJobApplicationById,
    updateJobApplication,
    deleteJobApplication
};