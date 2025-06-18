import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaUserCircle, FaBriefcase } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunks';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold flex items-center ${scrolled ? 'text-blue-600' : 'text-white'}`}
          >
            <FaBriefcase className="mr-2" />
            <span className={`bg-gradient-to-r ${scrolled ? 'from-blue-600 to-indigo-600' : 'from-white to-blue-100'} bg-clip-text text-transparent`}>
              TrackHire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/jobs" 
              className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              Browse Jobs
            </Link>
            <Link 
              to="/companies" 
              className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              Companies
            </Link>
            <Link 
              to="/resources" 
              className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              Resources
            </Link>
            <div className="flex items-center space-x-4 ml-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${scrolled ? 'text-blue-600 hover:bg-blue-50' : 'text-white hover:bg-white/10'}`}>
                    <FaUserCircle className="mr-2" />
                    {user?.fullname || user?.email || 'Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${scrolled ? 'text-blue-600 hover:bg-blue-50' : 'text-white hover:bg-white/10'}`}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FiX className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <FiMenu className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300`}>
          <div className={`mt-4 pb-4 space-y-3 ${scrolled ? 'bg-white' : 'bg-gray-900/95 backdrop-blur-sm rounded-lg'}`}>
            <Link 
              to="/jobs" 
              className={`block px-4 py-3 font-medium ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              Browse Jobs
            </Link>
            <Link 
              to="/companies" 
              className={`block px-4 py-3 font-medium ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              Companies
            </Link>
            <Link 
              to="/resources" 
              className={`block px-4 py-3 font-medium ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              Resources
            </Link>
            <div className="border-t pt-3 mt-3 px-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className={`block text-center px-4 py-2 rounded-lg font-medium ${scrolled ? 'text-blue-600 hover:bg-blue-50' : 'text-white hover:bg-white/10'}`}>
                    <FaUserCircle className="mr-2 inline" />
                    {user?.fullname || user?.email || 'Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`block text-center px-4 py-2 rounded-lg font-medium ${scrolled ? 'text-blue-600 hover:bg-blue-50' : 'text-white hover:bg-white/10'}`}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;