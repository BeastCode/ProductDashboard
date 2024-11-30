import React from 'react';
import { ArrowLeft, TrendingUp, Package, DollarSign, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Product } from '../types/Product';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ProductDashboardProps {
  product: Product;
  onBack: () => void;
}

export function ProductDashboard({ product, onBack }: ProductDashboardProps) {
  // Dummy data for charts
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 2780 },
    { month: 'May', sales: 1890 },
    { month: 'Jun', sales: 2390 },
  ];

  const categoryData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 },
    { name: 'Category D', value: 200 },
  ];

  const performanceData = [
    { metric: 'Views', value: 2400 },
    { metric: 'Clicks', value: 1398 },
    { metric: 'Sales', value: 9800 },
    { metric: 'Returns', value: 3908 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600">{product.text}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                <p className="text-2xl font-semibold text-gray-900">$12,345</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-semibold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">5,678</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2 grid grid-cols-5 gap-8">
            <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            </div>
            
            <div className="col-span-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}