import React from 'react';
import JobCard from '../components/JobCard';

const Dashboard = () => {
  const userJobs = [
    {
      id: 1,
      title: 'Senior Developer',
      company: 'Tech Corp',
      location: 'New York',
      type: 'Full-time',
      status: 'Applied'
    },
    // Add more user jobs as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Job Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 