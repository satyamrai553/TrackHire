import React from 'react';

const AdminDashboard = () => {
  const stats = {
    totalJobs: 150,
    activeJobs: 120,
    totalApplications: 500,
    pendingApplications: 50
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Jobs</h3>
          <p className="text-3xl font-bold">{stats.totalJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Active Jobs</h3>
          <p className="text-3xl font-bold">{stats.activeJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Applications</h3>
          <p className="text-3xl font-bold">{stats.totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Pending Applications</h3>
          <p className="text-3xl font-bold">{stats.pendingApplications}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 