import React from 'react';
import { useState } from 'react';
import { LayoutGrid, List, ArrowUpDown, Plus } from 'lucide-react';
import { AuthProvider, useAuth } from './store/AuthContext';
import { ProductForm } from './components/product/ProductForm';
import { ProductList } from './components/product/ProductList';
import { LoginForm } from './components/login/LoginForm';
import { Layout } from './components/Layout';
import { useProducts } from './hooks/useProducts';
import { Modal } from './components/Modal';
import { SurveyPage } from './pages/SurveyPage';
import { ProductDashboard } from './pages/ProductDashboard';

interface ProductControlsProps {
  isGrid: boolean;
  setIsGrid: (isGrid: boolean) => void;
  sortAsc: boolean;
  setSortAsc: (sortAsc: boolean) => void;
  onAddClick: () => void;
}

function ProductControls({ isGrid, setIsGrid, sortAsc, setSortAsc, onAddClick }: ProductControlsProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onAddClick}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Product
      </button>

      <div className="flex justify-end space-x-4 ml-4">
        <button
          onClick={() => setIsGrid(!isGrid)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isGrid ? (
            <>
              <List className="h-4 w-4 mr-2" />
              List View
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid View
            </>
          )}
        </button>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {sortAsc ? 'Sort Z-A' : 'Sort A-Z'}
        </button>
      </div>
    </div>
  );
}

function ProductManagement() {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const [isGrid, setIsGrid] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (selectedProduct) {
    return (
      <ProductDashboard
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  const sortedProducts = [...products].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortAsc ? comparison : -comparison;
  });

  const handleAddProduct = (name: string, text: string) => {
    addProduct(name, text);
    setIsModalOpen(false);
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'products' ? (
        <>
          <ProductControls
            isGrid={isGrid}
            setIsGrid={setIsGrid}
            sortAsc={sortAsc}
            setSortAsc={setSortAsc}
            onAddClick={() => setIsModalOpen(true)}
          />

          <div className="mt-6">
            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No products yet. Add your first product above!</p>
              </div>
            ) : (
              <ProductList
                products={sortedProducts}
                onEdit={editProduct}
                onDelete={deleteProduct}
                isGrid={isGrid}
                onSelect={setSelectedProduct}
              />
            )}
          </div>
        </>
      ) : (
        <SurveyPage />
      )}
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Modal>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductManagement />
    </AuthProvider>
  );
}

export default App;