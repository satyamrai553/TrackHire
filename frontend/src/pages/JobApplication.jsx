import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById } from '../features/jobs/jobThunks';
import { createJobApplication } from '../features/applications/applicationThunks.js';

const JobApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedJob: job, loading, error } = useSelector((state) => state.jobs);
  const [form, setForm] = useState({ name: '', email: '', coverLetter: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const applicationData = {
      ...form,
      job: id,
    };
    try {
      await dispatch(createJobApplication(applicationData));
      setSuccess(true);
      setForm({ name: '', email: '', coverLetter: '' });
    } catch (err) {
      console.error('Failed to submit application:', err);
      setSuccess(false);
    }
  };

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
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Link to={`/jobs/${id}`} className="text-blue-600 hover:underline mb-6 inline-block">← Back to Job Details</Link>
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-1">{job.jobTitle}</h1>
        <p className="text-gray-700 mb-1">{job.companyName}</p>
        <p className="text-gray-600 mb-2">{job.location}</p>
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded mb-2 text-sm">{job.jobType}</span>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Application submitted successfully!</div>
        )}
        <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplication; 