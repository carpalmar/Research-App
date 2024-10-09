import React from 'react';
import { Clock } from 'lucide-react'; // Changed from Timeline to Clock

const Timeline: React.FC = () => {
  // Sample data for the timeline
  const timelineData = [
    { date: '2023-05-01', asset: 'US Equities', recommendation: 'Overweight', performance: '+5%' },
    { date: '2023-05-15', asset: 'European Bonds', recommendation: 'Underweight', performance: '-2%' },
    { date: '2023-06-01', asset: 'Emerging Markets', recommendation: 'Neutral', performance: '+1%' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Clock className="mr-2" /> {/* Changed from Timeline to Clock */}
        Investment Performance Timeline
      </h2>
      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Clock className="text-white" /> {/* Changed from Timeline to Clock */}
            </div>
            <div className="ml-4 flex-grow">
              <div className="text-sm font-medium text-gray-900">{item.date}</div>
              <div className="text-sm text-gray-500">{item.asset}</div>
              <div className="text-sm font-semibold text-gray-700">
                {item.recommendation} | Performance: {item.performance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;