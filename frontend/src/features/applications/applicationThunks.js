// features/application/applicationThunks.js
import { jobApplicationAPI } from '../../api/jobApplicationAPI';
import {
  applicationRequestStart,
  applicationRequestFailure,
  setApplications,
  setCurrentApplication,
  addApplication,
  updateApplication,
  removeApplication,
} from './applicationSlice';

// Create new application
export const createJobApplication = (applicationData) => async (dispatch) => {
  try {
    dispatch(applicationRequestStart());
    const data = await jobApplicationAPI.createApplication(applicationData);
    dispatch(addApplication(data.data));
  } catch (error) {
    dispatch(applicationRequestFailure(error.message));
  }
};

// Get all applications for logged-in user
export const fetchAllApplications = () => async (dispatch) => {
  try {
    dispatch(applicationRequestStart());
    const data = await jobApplicationAPI.getAllApplications();
    dispatch(setApplications(data.data));
  } catch (error) {
    dispatch(applicationRequestFailure(error.message));
  }
};

// Get application by ID
export const fetchApplicationById = (id) => async (dispatch) => {
  try {
    dispatch(applicationRequestStart());
    const data = await jobApplicationAPI.getApplicationById(id);
    dispatch(setCurrentApplication(data.data));
  } catch (error) {
    dispatch(applicationRequestFailure(error.message));
  }
};

// Update application status
export const updateJobApplicationStatus = (id, updateData) => async (dispatch) => {
  try {
    dispatch(applicationRequestStart());
    const data = await jobApplicationAPI.updateApplicationStatus(id, updateData);
    dispatch(updateApplication(data.data));
  } catch (error) {
    dispatch(applicationRequestFailure(error.message));
  }
};

// Delete application
export const deleteJobApplication = (id) => async (dispatch) => {
  try {
    dispatch(applicationRequestStart());
    await jobApplicationAPI.deleteApplication(id);
    dispatch(removeApplication(id));
  } catch (error) {
    dispatch(applicationRequestFailure(error.message));
  }
};
