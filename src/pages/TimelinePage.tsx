import React from 'react';
import Timeline from '../components/Timeline';
import { Clock } from 'lucide-react'; // Changed Timeline to Clock

const TimelinePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Clock className="mr-2" /> {/* Changed Timeline to Clock */}
        Investment Research Timeline
      </h1>
      <Timeline />
    </div>
  );
};

export default TimelinePage;