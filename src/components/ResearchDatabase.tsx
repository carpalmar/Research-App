import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { FileText, Download } from 'lucide-react';

interface Research {
  id: string;
  description: string;
  assetType: string;
  region: string;
  researchHouse: string;
  author: string;
  score: number;
  explanation: string;
  fileUrl: string;
  timestamp: any;
}

const ResearchDatabase = () => {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ assetType: '', region: '', researchHouse: '', author: '' });

  useEffect(() => {
    const fetchResearch = async () => {
      const q = query(collection(db, 'research'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const researchData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Research));
      setResearch(researchData);
      setLoading(false);
    };

    fetchResearch();
  }, []);

  const filteredResearch = research.filter(item => 
    (filter.assetType === '' || item.assetType === filter.assetType) &&
    (filter.region === '' || item.region === filter.region) &&
    (filter.researchHouse === '' || item.researchHouse === filter.researchHouse) &&
    (filter.author === '' || item.author === filter.author)
  );

  const uniqueValues = (field: keyof Research) => 
    Array.from(new Set(research.map(item => item[field]))).sort();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Research Database</h1>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Asset Type</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filter.assetType}
                  onChange={(e) => setFilter({...filter, assetType: e.target.value})}
                >
                  <option value="">All</option>
                  {uniqueValues('assetType').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filter.region}
                  onChange={(e) => setFilter({...filter, region: e.target.value})}
                >
                  <option value="">All</option>
                  {uniqueValues('region').map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Research House</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filter.researchHouse}
                  onChange={(e) => setFilter({...filter, researchHouse: e.target.value})}
                >
                  <option value="">All</option>
                  {uniqueValues('researchHouse').map(house => (
                    <option key={house} value={house}>{house}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filter.author}
                  onChange={(e) => setFilter({...filter, author: e.target.value})}
                >
                  <option value="">All</option>
                  {uniqueValues('author').map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>
            </div>
            {loading ? (
              <p>Loading research...</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredResearch.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.assetType} | {item.region} | {item.researchHouse}
                        </p>
                        <p className="text-sm text-gray-500">
                          Author: {item.author} | Score: {item.score}
                        </p>
                      </div>
                      <div>
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Download className="h-5 w-5 mr-2" />
                          View
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchDatabase;