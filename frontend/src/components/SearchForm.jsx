// Search Form Component with Mobile-First Design
// File: frontend/src/components/SearchForm.jsx

import React, { useState, useEffect } from 'react';
import { getSectors, getSkills, getLocations } from '../utils/api';

const SearchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    sectors: [],
    location_state: '',
    max_results: 5
  });

  const [availableData, setAvailableData] = useState({
    sectors: [],
    skills: [],
    locations: { states: [], cities: [] }
  });

  const [skillInput, setSkillInput] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  // Education options
  const educationOptions = [
    'B.Tech', 'B.E', 'BCA', 'MCA', 'M.Tech', 'B.Com', 'BBA', 'MBA', 
    'CA', 'M.Com', 'MBBS', 'B.Pharma', 'BDS', 'BAMS', 'B.Sc Nursing',
    'BSc', 'B.Sc Agriculture', 'B.Tech Agricultural', 'M.Sc Agriculture',
    'B.Ed', 'M.Ed', 'BA', 'MA', 'MSc', 'Diploma', 'ITI', 'Mass Communication'
  ];

  useEffect(() => {
    // Load available data when component mounts
    const loadData = async () => {
      try {
        const [sectorsData, skillsData, locationsData] = await Promise.all([
          getSectors(),
          getSkills(),
          getLocations()
        ]);

        setAvailableData({
          sectors: sectorsData.sectors || [],
          skills: skillsData.skills || [],
          locations: locationsData || { states: [], cities: [] }
        });
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter skills based on input
    if (skillInput.trim()) {
      const filtered = availableData.skills.filter(skill =>
        skill.toLowerCase().includes(skillInput.toLowerCase()) &&
        !formData.skills.includes(skill)
      );
      setFilteredSkills(filtered.slice(0, 10)); // Show top 10 matches
    } else {
      setFilteredSkills([]);
    }
  }, [skillInput, availableData.skills, formData.skills]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillAdd = (skill) => {
    if (formData.skills.length < 10 && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
      setShowSkillDropdown(false);
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSectorToggle = (sector) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.education) {
      alert('Please select your education level');
      return;
    }
    
    if (formData.skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Education Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Education Level *
        </label>
        <select
          value={formData.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          required
        >
          <option value="">Select your education level</option>
          {educationOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills * (Select up to 10)
        </label>
        
        {/* Selected Skills */}
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.skills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Skill Input */}
        <div className="relative">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onFocus={() => setShowSkillDropdown(true)}
            placeholder="Type to search skills..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            disabled={formData.skills.length >= 10}
          />
          
          {/* Skill Dropdown */}
          {showSkillDropdown && filteredSkills.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredSkills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillAdd(skill)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
          {formData.skills.length}/10 skills selected
        </p>
      </div>

      {/* Preferred Sectors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Sectors (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableData.sectors.map(sector => (
            <label
              key={sector}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                formData.sectors.includes(sector)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.sectors.includes(sector)}
                onChange={() => handleSectorToggle(sector)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-4 h-4 border-2 rounded mr-2 flex items-center justify-center ${
                  formData.sectors.includes(sector)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {formData.sectors.includes(sector) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{sector}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred State (Optional)
        </label>
        <select
          value={formData.location_state}
          onChange={(e) => handleInputChange('location_state', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        >
          <option value="">Any state</option>
          {availableData.locations.states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Number of Results */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Recommendations
        </label>
        <select
          value={formData.max_results}
          onChange={(e) => handleInputChange('max_results', parseInt(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        >
          <option value={3}>3 recommendations</option>
          <option value={5}>5 recommendations</option>
          <option value={7}>7 recommendations</option>
          <option value={10}>10 recommendations</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find My Perfect Internships
        </div>
      </button>

      {/* Form Summary */}
      {(formData.education || formData.skills.length > 0) && (
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Search Summary:</h3>
          <div className="space-y-1 text-xs text-gray-600">
            {formData.education && (
              <div>Education: <span className="font-medium">{formData.education}</span></div>
            )}
            {formData.skills.length > 0 && (
              <div>Skills: <span className="font-medium">{formData.skills.join(', ')}</span></div>
            )}
            {formData.sectors.length > 0 && (
              <div>Sectors: <span className="font-medium">{formData.sectors.join(', ')}</span></div>
            )}
            {formData.location_state && (
              <div>Location: <span className="font-medium">{formData.location_state}</span></div>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchForm;