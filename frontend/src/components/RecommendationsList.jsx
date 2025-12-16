import React from 'react';
import InternshipCard from './InternshipCard';

const RecommendationsList = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No recommendations available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Found {recommendations.length} Perfect Matches
        </h2>
        <p className="text-gray-600">
          AI-powered recommendations ranked by compatibility
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((internship, index) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;


