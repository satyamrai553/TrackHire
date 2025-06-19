import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById } from '../features/jobs/jobThunks';

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedJob: job, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="container mx-auto py-12 px-4 text-blue-500">Loading job details...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-12 px-4 text-red-500">Error: {error}</div>;
  }

  if (!job) {
    return <div className="container mx-auto py-12 px-4 text-gray-500">No job found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <Link to="/jobs" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Jobs</Link>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.jobTitle}</h1>
        <p className="text-lg text-gray-700 mb-1">{job.companyName}</p>
        <p className="text-gray-600 mb-4">{job.location}</p>
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded mb-4 text-sm">{job.jobType}</span>
        <p className="text-gray-800 mb-6 whitespace-pre-line">{job.jobDescription}</p>
        {job.applicationLink && (
          <Link
            to={`/jobs/${job._id}/apply`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
          >
            Apply Now
          </Link>
        )}
        <div className="text-gray-500 text-sm mt-6">
          Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 