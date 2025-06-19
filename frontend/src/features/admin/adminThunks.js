// features/admin/adminThunks.js
import { adminAPI } from '../../api/adminAPI';
import {
  adminRequestStart,
  adminRequestFailure,
  setUsers,
  removeUser,
  setJobs,
  removeJob,
} from './adminSlice';

// Fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(adminRequestStart());
    const data = await adminAPI.getAllUsers();
    dispatch(setUsers(data.data)); // assuming { data: [...] }
  } catch (error) {
    dispatch(adminRequestFailure(error.message));
  }
};

// Delete user
export const deleteUserById = (userId) => async (dispatch) => {
  try {
    dispatch(adminRequestStart());
    await adminAPI.deleteUser(userId);
    dispatch(removeUser(userId));
  } catch (error) {
    dispatch(adminRequestFailure(error.message));
  }
};

// Fetch all jobs
export const fetchAllJobs = () => async (dispatch) => {
  try {
    dispatch(adminRequestStart());
    const data = await adminAPI.getAllJobs();
    dispatch(setJobs(data.data)); // assuming { data: [...] }
  } catch (error) {
    dispatch(adminRequestFailure(error.message));
  }
};

// Delete job
export const deleteJobById = (jobId) => async (dispatch) => {
  try {
    dispatch(adminRequestStart());
    await adminAPI.deleteJob(jobId);
    dispatch(removeJob(jobId));
  } catch (error) {
    dispatch(adminRequestFailure(error.message));
  }
};
