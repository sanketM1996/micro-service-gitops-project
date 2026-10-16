import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, LogOut, Shield, User } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-3">
        <CheckSquare className="h-6 w-6 text-indigo-500" />
        <span className="font-bold text-lg tracking-wide">MERN Microservices Todo</span>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="hover:text-indigo-400 transition">My Todos</Link>
        
        {(user.role === 'Admin' || user.role === 'Manager') && (
          <Link to="/admin" className="flex items-center space-x-1 hover:text-indigo-400 transition">
            <Shield className="h-4 w-4 text-amber-400" />
            <span>Admin Panel</span>
          </Link>
        )}

        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs bg-indigo-600 px-2 py-0.5 rounded text-indigo-100">{user.role}</span>
        </div>

        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg transition border border-red-500/30">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};