import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api/adminAPI';
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
    if (!isAuthenticated) navigate('/login');
    else if (user?.role !== 'admin') navigate('/');
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [jobsRes, usersRes] = await Promise.all([
          adminAPI.getAllJobs(),
          adminAPI.getAllUsers()
        ]);

        const jobs = jobsRes;
        const users = usersRes;
        const totalApplications = jobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
        const pendingApplications = jobs.reduce(
          (sum, job) => sum + (job.applications?.filter(a => a.status === 'Pending')?.length || 0),
          0
        );

        setStats({
          totalJobs: jobs.length,
          activeJobs: jobs.filter(job => job.status === 'Active').length,
          totalApplications,
          pendingApplications,
          recentJobs: jobs.slice(0, 5),
          recentUsers: users.slice(0, 5)
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== 'admin') return null;
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Jobs" value={stats.totalJobs} icon="📊" trend="up" percentage="12%" color="blue" />
        <StatCard title="Active Jobs" value={stats.activeJobs} icon="✅" trend="up" percentage="5%" color="green" />
        <StatCard title="Total Applications" value={stats.totalApplications} icon="📝" trend="down" percentage="3%" color="indigo" />
        <StatCard title="Pending Applications" value={stats.pendingApplications} icon="⏳" trend="up" percentage="8%" color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Applications by Status</h3>
          <PieChart data={[
            { name: 'Applied', value: 45 },
            { name: 'Interview', value: 25 },
            { name: 'Offer', value: 10 },
            { name: 'Rejected', value: 15 },
            { name: 'Accepted', value: 5 },
          ]} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Jobs by Month</h3>
          <BarChart data={[
            { month: 'Jan', jobs: 20 },
            { month: 'Feb', jobs: 35 },
            { month: 'Mar', jobs: 28 },
            { month: 'Apr', jobs: 42 },
            { month: 'May', jobs: 30 },
            { month: 'Jun', jobs: 25 }
          ]} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTable title="Recent Jobs" data={stats.recentJobs} columns={["companyName", "jobTitle", "status", "applications"]} />
        <RecentTable title="Recent Users" data={stats.recentUsers} columns={["fullname", "email", "role"]} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, percentage, color }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colors[color]}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      <p className={`mt-4 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? '↑' : '↓'} {percentage} <span className="text-gray-400">vs last month</span>
      </p>
    </div>
  );
};

const RecentTable = ({ title, data, columns }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2">
                  {col === 'applications' ? item.applications?.length ?? 0 : item[col]}
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
