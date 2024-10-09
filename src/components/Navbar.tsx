import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Upload, Database, Clock, LogOut, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">InvestResearch</Link>
        {user && (
          <div className="space-x-4">
            <Link to="/upload" className="hover:text-gray-300"><Upload className="inline mr-1" size={18} /> Upload</Link>
            <Link to="/database" className="hover:text-gray-300"><Database className="inline mr-1" size={18} /> Database</Link>
            <Link to="/timeline" className="hover:text-gray-300"><Clock className="inline mr-1" size={18} /> Timeline</Link>
            <Link to="/admin" className="hover:text-gray-300"><Settings className="inline mr-1" size={18} /> Admin</Link>
            <button onClick={handleLogout} className="hover:text-gray-300"><LogOut className="inline mr-1" size={18} /> Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;