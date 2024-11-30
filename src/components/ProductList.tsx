import React from 'react';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onEdit: (id: string, updates: Partial<Product>) => void;
  onDelete: (id: string) => void;
  isGrid: boolean;
  onSelect: (product: Product) => void;
}

export function ProductList({ products, onEdit, onDelete, isGrid, onSelect }: ProductListProps) {
  return (
    <div
      className={
        isGrid
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'space-y-4'
      }
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          isGrid={isGrid}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}