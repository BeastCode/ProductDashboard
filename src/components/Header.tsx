import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export function Header() {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
      <button
        onClick={logout}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </button>
    </div>
  );
}