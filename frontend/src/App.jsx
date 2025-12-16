// Main React Application Component
// File: frontend/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';
import logo from 'C:/pm-internship-recommender/frontend/src/assets/pm-internship-logo.png'; // Import your logo

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <Router>
      {/* Updated background gradient to reflect logo colors */}
      <div className="App min-h-screen bg-gradient-to-br from-orange-50 to-blue-100">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-blue-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Logo integration */}
                <div className="w-12 h-12"> {/* Increased size for better logo display */}
                  <img src={logo} alt="PM Internship Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">PM Internship Finder</h1>
                  <p className="text-sm text-gray-600">AI-Powered Recommendation Engine</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {/* Adjusted badge colors */}
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  SIH 2025 Project
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  GITAM University
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main" className="container mx-auto px-4 py-8">
          {isLoading && <LoadingSpinner />}
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  setIsLoading={setIsLoading}
                  setRecommendations={setRecommendations}
                  setSearchQuery={setSearchQuery}
                />
              } 
            />
            <Route 
              path="/results" 
              element={
                <Results 
                  recommendations={recommendations}
                  searchQuery={searchQuery}
                  setIsLoading={setIsLoading}
                  setRecommendations={setRecommendations}
                />
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        {/* Adjusted footer background color to a darker tone from the logo */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">PM Internship Scheme</h3>
                <p className="text-gray-300 text-sm">
                  Smart India Hackathon 2025 project by GITAM University, Hyderabad.
                  AI-powered recommendation engine for PM Internship Scheme.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Personalized Recommendations</li>
                  <li>• TF-IDF Based Matching</li>
                  <li>• Mobile-First Design</li>
                  <li>• Multilingual Support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Team</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>Deeraj - Backend & AI</li>
                  <li>Srujan - DevOps & Integration</li>
                  <li>Ruchika - UX/UI Design</li>
                  <li>Vijeta - Frontend</li>
                  <li>Keshav - Data Engineering</li>
                  <li>Manideep - Integration & Demo</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
              <p>&copy; 2025 PM Internship Recommendation Engine. Built for Smart India Hackathon 2025.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;