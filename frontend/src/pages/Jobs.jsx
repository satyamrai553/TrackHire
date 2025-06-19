import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs } from '../features/jobs/jobThunks.js'; // adjust the path as needed
import { Link } from 'react-router-dom';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>

      {loading && <p className="text-blue-500">Loading jobs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && jobs?.length === 0 && (
        <p className="text-gray-500">No job listings found.</p>
      )}

      {!loading && !error && jobs?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700">{job.jobTitle}</h2>
              <p className="text-gray-700 mt-1">{job.companyName}</p>
              <p className="text-gray-600 text-sm mt-1">{job.location}</p>
              <p className="mt-2 text-sm px-2 py-1 inline-block rounded bg-green-100 text-green-700">
                {job.jobType}
              </p>
              <div className="mt-4">
                <Link
                  to={`/jobs/${job._id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
