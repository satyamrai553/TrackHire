import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobForm from './pages/JobForm';
import AdminDashboard from './pages/AdminDashboard';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import JobApplication from './pages/JobApplication';
import Companies from './pages/Companies';
import Resources from './pages/Resources';
import AuthPersist from './components/AuthPersist';

const App = () => {
  return (
    <Router>
      <AuthPersist />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-job" element={<JobForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/jobs/:id/apply" element={<JobApplication />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
