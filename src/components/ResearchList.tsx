import React from 'react';
import { Clock } from 'lucide-react'; // Changed from Timeline to Clock

// ... rest of the imports

const ResearchList: React.FC = () => {
  // ... component logic

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Clock className="mr-2" /> {/* Changed from Timeline to Clock */}
        Research List
      </h2>
      {/* ... rest of the component */}
    </div>
  );
};

export default ResearchList;