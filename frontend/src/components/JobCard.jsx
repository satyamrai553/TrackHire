import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600 mt-2">{job.company}</p>
      <p className="text-gray-500 mt-1">{job.location}</p>
      <div className="mt-4">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
          {job.type}
        </span>
      </div>
    </div>
  );
};

export default JobCard; 