import React from 'react';
import { LayoutGrid, ClipboardList } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => onNavigate('products')}
            className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
              currentPage === 'products'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="h-5 w-5 mr-3" />
            Products
          </button>
          <button
            onClick={() => onNavigate('survey')}
            className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
              currentPage === 'survey'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ClipboardList className="h-5 w-5 mr-3" />
            Survey
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}