import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { BarChartComponent as BarChart, PieChartComponent as PieChart } from '../components/Charts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    recentJobs: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminDashboard auth:', { isAuthenticated, user });
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [jobsRes, usersRes] = await Promise.all([
          api.get('/admin/jobs'),
          api.get('/admin/users')
        ]);

        const jobs = jobsRes.data.data;
        const users = usersRes.data.data;

        setStats({
          totalJobs: jobs.length,
          activeJobs: jobs.filter(job => job.status === 'Active').length,
          totalApplications: jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0),
          pendingApplications: jobs.reduce((acc, job) => acc + (job.pendingApplications?.length || 0), 0),
          recentJobs: jobs.slice(0, 5),
          recentUsers: users.slice(0, 5)
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if admin
    if (isAuthenticated && user && user.role === 'admin') {
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null; // Show nothing while redirecting
  }

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Jobs" 
          value={stats.totalJobs} 
          icon="📊" 
          trend="up" 
          percentage="12%"
          color="blue"
        />
        <StatCard 
          title="Active Jobs" 
          value={stats.activeJobs} 
          icon="✅" 
          trend="up" 
          percentage="5%"
          color="green"
        />
        <StatCard 
          title="Total Applications" 
          value={stats.totalApplications} 
          icon="📝" 
          trend="down" 
          percentage="3%"
          color="indigo"
        />
        <StatCard 
          title="Pending Applications" 
          value={stats.pendingApplications} 
          icon="⏳" 
          trend="up" 
          percentage="8%"
          color="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Applications by Status</h3>
          <div className="h-64">
            <PieChart 
              data={[
                { name: 'Applied', value: 45 },
                { name: 'Interview', value: 25 },
                { name: 'Offer', value: 10 },
                { name: 'Rejected', value: 15 },
                { name: 'Accepted', value: 5 }
              ]}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Jobs by Month</h3>
          <div className="h-64">
            <BarChart 
              data={[
                { month: 'Jan', jobs: 20 },
                { month: 'Feb', jobs: 35 },
                { month: 'Mar', jobs: 28 },
                { month: 'Apr', jobs: 42 },
                { month: 'May', jobs: 30 },
                { month: 'Jun', jobs: 25 }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTable 
          title="Recent Jobs" 
          data={stats.recentJobs} 
          columns={['company', 'role', 'status', 'applications']}
          linkPath="/admin/jobs"
        />
        <RecentTable 
          title="New Users" 
          data={stats.recentUsers} 
          columns={['fullname', 'email', 'role']}
          linkPath="/admin/users"
        />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, trend, percentage, color }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      <div className={`mt-4 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        <span>{trend === 'up' ? '↑' : '↓'} {percentage}</span>
        <span className="ml-1 text-gray-500">vs last month</span>
      </div>
    </div>
  );
};

// Recent Table Component
const RecentTable = ({ title, data, columns, linkPath }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <a href={linkPath} className="text-sm text-blue-600 hover:underline">View all</a>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map(col => (
                <td key={col} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {item[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;