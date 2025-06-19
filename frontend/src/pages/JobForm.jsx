import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminAPI } from '../api/adminAPI';

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: 'full-time', // Changed to match enum values
    jobDescription: '',
    applicationLink: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log('JobForm user:', user);
  console.log('JobForm isAuthenticated:', isAuthenticated);

  useEffect(() => {
  console.log('Auth check running - isAuthenticated:', isAuthenticated);
  console.log('User object:', user);
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    navigate('/login');
  } else if (!user || user.role !== 'admin') {
    console.log('User not admin, redirecting to home');
    console.log('User role:', user?.role);
    navigate('/');
  }
}, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    
    try {
      await adminAPI.createJob(formData);
      setSuccess('Job posted successfully!');
      setTimeout(() => navigate('/jobs'), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to post job. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title *
          </label>
          <input
            type="text"
            id="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
            minLength="3"
          />
        </div>
        
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
            minLength="2"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
            Job Type *
          </label>
          <select
            id="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="6"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
            minLength="10"
          />
        </div>
        
        <div>
          <label htmlFor="applicationLink" className="block text-sm font-medium text-gray-700">
            Application Link
          </label>
          <input
            type="url"
            id="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://example.com/apply"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;