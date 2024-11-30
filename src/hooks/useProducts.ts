import { useState, useCallback } from 'react';
import { Product } from '../types/Product';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee Maker',
    text: 'Professional-grade coffee maker with built-in grinder and programmable settings. Perfect for home or office use.',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Smart Home Hub',
    text: 'Central control unit for all your smart home devices. Features voice control and automated scheduling.',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    text: 'Fully adjustable office chair with lumbar support and breathable mesh back. Designed for all-day comfort.',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '4',
    name: 'Wireless Earbuds',
    text: 'High-fidelity wireless earbuds with active noise cancellation and 24-hour battery life.',
    createdAt: new Date('2024-03-01'),
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = useCallback((name: string, text: string) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      text,
      createdAt: new Date(),
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const editProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
  };
}