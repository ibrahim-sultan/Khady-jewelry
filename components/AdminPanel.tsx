import React, { useState, useEffect } from 'react';
import { getStoredProducts, saveProduct, deleteProduct, getStoredOrders } from '../services/storage.ts';
import { PlusIcon, TrashIcon } from './Icons.tsx';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: 'Rings'
  });

  useEffect(() => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: Number(newProduct.price),
      description: newProduct.description || '',
      image: newProduct.image || `https://picsum.photos/seed/${Date.now()}/800/800`,
      category: newProduct.category || 'Jewelry'
    };
    
    saveProduct(product);
    setProducts(getStoredProducts());
    setNewProduct({ name: '', price: 0, description: '', image: '', category: 'Rings' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this piece from inventory?')) {
      deleteProduct(id);
      setProducts(getStoredProducts());
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="serif text-3xl font-bold mb-8 text-neutral-800">Admin Dashboard</h1>
      
      <div className="flex border-b border-neutral-200 mb-8">
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'products' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-neutral-500'}`}
        >
          Manage Inventory
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'orders' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-neutral-500'}`}
        >
          Recent Orders
        </button>
      </div>

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm h-fit">
            <h2 className="serif text-xl font-semibold mb-4 flex items-center gap-2">
              <PlusIcon className="w-5 h-5 text-amber-600" />
              Add New Piece
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
                  placeholder="e.g. Diamond Pendant"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Category</label>
                <select 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>Rings</option>
                  <option>Necklaces</option>
                  <option>Earrings</option>
                  <option>Bracelets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
                  placeholder="Link to product image"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Description</label>
                <textarea 
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
                  rows={3}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
              >
                Save Product
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="serif text-xl font-semibold mb-4">Current Inventory</h2>
            {products.length === 0 ? (
              <p className="text-neutral-500 italic">Inventory is empty.</p>
            ) : products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4 group">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-neutral-100" />
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800">{product.name}</h3>
                  <p className="text-amber-700 font-medium">${product.price.toLocaleString()}</p>
                  <p className="text-sm text-neutral-500 line-clamp-1">{product.description}</p>
                </div>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="serif text-xl font-semibold mb-4">Customer Orders</h2>
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
              <p className="text-neutral-500">No orders have been placed yet.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {[...orders].reverse().map(order => (
                <div key={order.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                  <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Order ID</span>
                      <p className="font-mono text-sm text-neutral-600">#{order.id.slice(-8)}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</span>
                      <p className="text-emerald-600 font-semibold">{order.status}</p>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-2 underline decoration-amber-200">Customer Details</h3>
                      <p className="text-sm"><strong>Name:</strong> {order.customerName}</p>
                      <p className="text-sm"><strong>Email:</strong> {order.email}</p>
                      <p className="text-sm"><strong>Phone:</strong> {order.phone}</p>
                      <div className="mt-3 p-3 bg-neutral-50 rounded border border-neutral-100">
                        <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Shipping Address</p>
                        <p className="text-sm whitespace-pre-wrap">{order.address}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-2 underline decoration-amber-200">Order Items</h3>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-neutral-600">{item.name} <span className="text-neutral-400">x{item.quantity}</span></span>
                            <span className="text-neutral-800 font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t border-neutral-100 pt-2 mt-2 flex justify-between font-bold text-amber-700 text-lg">
                          <span>Total Paid</span>
                          <span>${order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;