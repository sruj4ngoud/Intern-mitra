import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationsList from '../components/RecommendationsList';

const Results = ({ recommendations, searchQuery }) => {
  const navigate = useNavigate();

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any internships matching your criteria. Try adjusting your search parameters.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Perfect Matches
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            New Search
          </button>
        </div>
        
        {searchQuery && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Search Summary:</h3>
            <div className="text-sm text-blue-700">
              <span className="font-medium">Education:</span> {searchQuery.education} |{' '}
              <span className="font-medium">Skills:</span> {searchQuery.skills.join(', ')}
              {searchQuery.sectors && searchQuery.sectors.length > 0 && (
                <> | <span className="font-medium">Sectors:</span> {searchQuery.sectors.join(', ')}</>
              )}
              {searchQuery.location_state && (
                <> | <span className="font-medium">Location:</span> {searchQuery.location_state}</>
              )}
            </div>
          </div>
        )}
      </div>

      <RecommendationsList recommendations={recommendations} />
    </div>
  );
};

export default Results;