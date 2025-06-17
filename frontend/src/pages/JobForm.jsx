import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add job posting logic here
    console.log('Job posting attempt:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobForm; 