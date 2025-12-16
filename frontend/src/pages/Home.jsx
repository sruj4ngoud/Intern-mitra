// Home Page Component with Search Form
// File: frontend/src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import { getRecommendations, getStats } from '../utils/api';

const Home = ({ setIsLoading, setRecommendations, setSearchQuery }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load system statistics on component mount
    const loadStats = async () => {
      try {
        const statsData = await getStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

  const handleSearch = async (formData) => {
    setError('');
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.education) {
        throw new Error('Please select your education level');
      }
      
      if (!formData.skills || formData.skills.length === 0) {
        throw new Error('Please select at least one skill');
      }

      // Store search query for results page
      setSearchQuery(formData);

      // Get recommendations from API
      const recommendations = await getRecommendations(formData);
      
      if (!recommendations || recommendations.length === 0) {
        setError('No matching internships found. Please try different skills or sectors.');
        setIsLoading(false);
        return;
      }

      // Store recommendations and navigate to results
      setRecommendations(recommendations);
      navigate('/results');
      
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message || 'An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-8.772-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Find Your Perfect
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            PM Internship
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered recommendation engine that matches your skills and interests 
          with the best internship opportunities in the PM Internship Scheme
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Matching</h3>
            <p className="text-gray-600 text-sm">Advanced AI algorithm matches your profile with the most suitable internships</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">Get personalized recommendations in under 2 seconds</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">High Accuracy</h3>
            <p className="text-gray-600 text-sm">90%+ matching accuracy with transparent explanations</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      {stats && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Opportunities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total_internships}</div>
              <div className="text-sm text-gray-600">Total Internships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.total_sectors}</div>
              <div className="text-sm text-gray-600">Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{stats.total_companies}</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">{stats.total_locations}</div>
              <div className="text-sm text-gray-600">Locations</div>
            </div>
          </div>
        </div>
      )}

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Find Your Perfect Match
        </h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}
        
        <SearchForm onSubmit={handleSearch} />
      </div>

      {/* How It Works Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Your Profile</h3>
            <p className="text-gray-600">Provide your education, skills, and preferences</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analysis</h3>
            <p className="text-gray-600">Our TF-IDF algorithm finds the best matches</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Results</h3>
            <p className="text-gray-600">Receive personalized recommendations with explanations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;