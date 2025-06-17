import React from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';

const featuredJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Innovators',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    posted: '2 days ago',
    logo: 'https://via.placeholder.com/60',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Cloud Solutions',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$70 - $90/hr',
    posted: '1 week ago',
    logo: 'https://via.placeholder.com/60',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Minds',
    location: 'New York, NY',
    type: 'Part-time',
    salary: '$45 - $65/hr',
    posted: '3 days ago',
    logo: 'https://via.placeholder.com/60',
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    posted: 'Just now',
    logo: 'https://via.placeholder.com/60',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'InfraScale',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    posted: '5 days ago',
    logo: 'https://via.placeholder.com/60',
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'Visionary Labs',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$95,000 - $125,000',
    posted: '1 day ago',
    logo: 'https://via.placeholder.com/60',
  },
];

const stats = [
  { value: '10,000+', label: 'Jobs Posted' },
  { value: '5,000+', label: 'Companies' },
  { value: '50,000+', label: 'Candidates' },
  { value: '95%', label: 'Satisfaction Rate' },
];

const Home = () => (
  <div className="bg-white">
    {/* Hero Section */}
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your <span className="text-yellow-300">Dream Job</span> Today
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who found their perfect match through our platform
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all transform hover:-translate-y-1 duration-300"
          >
            Browse Jobs
          </Link>
          <Link
            to="/post-job"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1 duration-300"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Jobs */}
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured <span className="text-blue-600">Jobs</span></h2>
          <Link to="/jobs" className="text-blue-600 hover:underline flex items-center">
            View all jobs <span className="ml-2">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take the next step in your career?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Create your free account and get matched with opportunities that fit your skills and goals.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all transform hover:-translate-y-1 duration-300"
          >
            Sign Up Free
          </Link>
          <Link
            to="/about"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1 duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our <span className="text-blue-600">Users Say</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">U</span>
                </div>
                <div>
                  <p className="font-semibold">John D.</p>
                  <p className="text-gray-500 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Found my dream job within two weeks of using TrackHire. The application tracking features saved me hours of work!"
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;