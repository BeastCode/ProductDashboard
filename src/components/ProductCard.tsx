import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onEdit: (id: string, updates: Partial<Product>) => void;
  onDelete: (id: string) => void;
  isGrid: boolean;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete, isGrid, onSelect }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [text, setText] = useState(product.text);

  const handleSave = () => {
    if (name.trim() && text.trim()) {
      onEdit(product.id, { name: name.trim(), text: text.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setName(product.name);
    setText(product.text);
    setIsEditing(false);
  };

  const baseClasses = `bg-white rounded-lg shadow-md p-4 ${
    isGrid ? 'h-full' : 'mb-4'
  }`;

  if (isEditing) {
    return (
      <div className={baseClasses}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          rows={3}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full"
          >
            <Check className="h-5 w-5" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} cursor-pointer transition-all hover:shadow-lg`}
      onClick={() => onSelect(product)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{product.text}</p>
      <div className="mt-2 text-sm text-gray-500">
        Added: {product.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}