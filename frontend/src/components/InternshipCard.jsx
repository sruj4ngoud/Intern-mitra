import React from 'react';

const InternshipCard = ({ internship, rank }) => {
  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  const formatScore = (score) => {
    return Math.round(score * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {rank}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {internship.title}
            </h3>
            <p className="text-lg text-blue-600 font-semibold">
              {internship.company}
            </p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(internship.similarity_score)}`}>
          {formatScore(internship.similarity_score)}% Match
        </div>
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-600">
            {internship.location_city}, {internship.location_state}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span className="text-sm text-gray-600">{internship.stipend}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-600">{internship.duration_weeks} weeks</span>
        </div>
      </div>

      {/* Sector and Education */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
          {internship.sector}
        </span>
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
          {internship.education_requirement}
        </span>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {internship.skills_required.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* AI Explanation */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 mb-4">
        <h4 className="text-sm font-medium text-green-800 mb-1">
          🤖 Why this matches you:
        </h4>
        <p className="text-sm text-green-700">{internship.reason}</p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          {internship.description}
        </p>
      </div>

      {/* Apply Button */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Apply by: {new Date(internship.application_deadline || '2025-10-15').toLocaleDateString()}
        </div>
        <a
          href={internship.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
        >
          <span>Apply on PMIS</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default InternshipCard;