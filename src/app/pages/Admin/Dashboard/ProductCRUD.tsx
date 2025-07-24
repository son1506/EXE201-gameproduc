// src/app/pages/Admin/Dashboard/ProductCRUD.tsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, X, Save, Package } from 'lucide-react';
import { message, Select } from 'antd';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import { runFirebaseTest } from '../../../Utils/testFirebase';

const API_BASE_URL = 'https://webdb-backend.azurewebsites.net/api/Product';
const { Option } = Select;

// Define Product interface
interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  categoryId: string;
  productImageUrl: string;
  productQuantity: number;
  createdAt?: string;
  isActive?: boolean;
}

// Define FormData interface
interface FormData {
  productName: string;
  productDescription: string;
  productPrice: string;
  categoryId: string;
  productImageUrl: string;
  productQuantity: string;
}

// Category options
const categoryOptions = [
  { value: 'apparel', label: '👕 Apparel (Clothing)', color: '#f472b6' },
  { value: 'accessories', label: '👑 Accessories', color: '#8b5cf6' },
  { value: 'collectibles', label: '🎁 Collectibles', color: '#06b6d4' },
  { value: 'keyring', label: '🔑 Keyring', color: '#10b981' },
  { value: 'pin', label: '📌 Pin (Badges)', color: '#f59e0b' },
];

const ProductCRUD: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [testingFirebase, setTestingFirebase] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productDescription: '',
    productPrice: '',
    categoryId: '',
    productImageUrl: '',
    productQuantity: ''
  });

  // Fetch all products
  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/GetAllProducts`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      message.error('Error fetching products: ' + errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create product
  const createProduct = async (): Promise<void> => {
    if (!formData.productImageUrl) {
      message.error('Please upload a product image');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/CreateProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productPrice: parseFloat(formData.productPrice) || 0,
          productQuantity: parseInt(formData.productQuantity) || 0
        })
      });
      
      if (!response.ok) throw new Error('Failed to create product');
      
      message.success('Product created successfully!');
      await fetchProducts();
      resetForm();
      setShowForm(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      message.error('Error creating product: ' + errorMessage);
    }
  };

  // Update product
  const updateProduct = async (): Promise<void> => {
    if (!editingProduct) return;
    
    if (!formData.productImageUrl) {
      message.error('Please upload a product image');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/UpdateProduct/${editingProduct.productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productPrice: parseFloat(formData.productPrice) || 0,
          productQuantity: parseInt(formData.productQuantity) || 0
        })
      });
      
      if (!response.ok) throw new Error('Failed to update product');
      
      message.success('Product updated successfully!');
      await fetchProducts();
      resetForm();
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      message.error('Error updating product: ' + errorMessage);
    }
  };

  // Delete product
  const deleteProduct = async (productId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/DeleteProduct/${productId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      message.success('Product deleted successfully!');
      await fetchProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      message.error('Error deleting product: ' + errorMessage);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct();
    } else {
      createProduct();
    }
  };

  // Reset form
  const resetForm = (): void => {
    setFormData({
      productName: '',
      productDescription: '',
      productPrice: '',
      categoryId: '',
      productImageUrl: '',
      productQuantity: ''
    });
    setEditingProduct(null);
  };

  // Start editing
  const startEdit = (product: Product): void => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName || '',
      productDescription: product.productDescription || '',
      productPrice: product.productPrice?.toString() || '',
      categoryId: product.categoryId || '',
      productImageUrl: product.productImageUrl || '',
      productQuantity: product.productQuantity?.toString() || ''
    });
    setShowForm(true);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle category change
  const handleCategoryChange = (value: string): void => {
    setFormData(prev => ({
      ...prev,
      categoryId: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (url: string | string[]): void => {
    const imageUrl = Array.isArray(url) ? url[0] || '' : url;
    setFormData(prev => ({
      ...prev,
      productImageUrl: imageUrl
    }));
  };

  // Handle Firebase test
  const handleTestFirebase = async (): Promise<void> => {
    setTestingFirebase(true);
    try {
      await runFirebaseTest();
    } catch (error) {
      console.error('Firebase test failed:', error);
    } finally {
      setTestingFirebase(false);
    }
  };

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  // Get category display info
  const getCategoryInfo = (categoryId: string) => {
    return categoryOptions.find(cat => cat.value === categoryId) || { 
      label: categoryId, 
      color: '#6b7280' 
    };
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Package className="w-10 h-10 text-blue-600" />
            Product Management System
          </h1>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-700">Products List</h2>
          <div className="flex gap-3">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          name="productName"
                          value={formData.productName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="productDescription"
                          value={formData.productDescription}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price *
                          </label>
                          <input
                            type="number"
                            name="productPrice"
                            value={formData.productPrice}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity *
                          </label>
                          <input
                            type="number"
                            name="productQuantity"
                            value={formData.productQuantity}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <Select
                          value={formData.categoryId}
                          onChange={handleCategoryChange}
                          className="w-full"
                          size="large"
                          placeholder="Select a category"
                        >
                          {categoryOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: option.color }}
                                />
                                {option.label}
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image *
                      </label>
                      <ImageUpload
                        value={formData.productImageUrl}
                        onChange={handleImageUpload}
                        folder="products"
                        maxCount={1}
                        compress={true}
                        quality={0.8}
                      />
                      {formData.productImageUrl && (
                        <div className="mt-2 text-sm text-green-600">
                          ✅ Image uploaded successfully
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {editingProduct ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 mt-2">Click "Add New Product" to create your first product</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => {
                    const categoryInfo = getCategoryInfo(product.categoryId);
                    return (
                      <tr key={product.productId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {product.productImageUrl && (
                              <img
                                src={product.productImageUrl}
                                alt={product.productName}
                                className="w-12 h-12 rounded-lg mr-4 object-cover border border-gray-200"
                                onError={handleImageError}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {product.productName}
                              </div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {product.productDescription || '-'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: categoryInfo.color }}
                            />
                            <span className="text-sm text-gray-900">
                              {categoryInfo.label.split(' ')[1] || categoryInfo.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${product.productPrice?.toFixed(2) || '0.00'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.productQuantity || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => startEdit(product)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Edit2 className="w-4 h-4 inline" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.productId)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCRUD;