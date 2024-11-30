import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (name: string, text: string) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      onSubmit(name.trim(), text.trim());
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter product name"
        />
      </div>
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter product description"
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Product
      </button>
    </form>
  );
}