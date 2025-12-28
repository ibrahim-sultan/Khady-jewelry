import React, { useState, useEffect } from 'react';
import { getStoredProducts } from '../services/storage.ts';
import { ShoppingBagIcon } from './Icons.tsx';

const BuyerView = ({ onAddToCart, cartCount, onOpenCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Hero Background"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="serif text-5xl md:text-7xl font-bold mb-4 tracking-tight">Aura Luxe</h1>
          <p className="text-xl md:text-2xl font-light tracking-widest uppercase mb-8 opacity-90">Crafting Timeless Elegance</p>
          <button className="px-8 py-3 bg-white text-neutral-900 font-semibold tracking-wider hover:bg-neutral-200 transition-colors uppercase text-sm">
            Explore Collection
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                  selectedCategory === cat 
                  ? 'bg-neutral-900 text-white border-neutral-900' 
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <span>Showing {filteredProducts.length} unique pieces</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-lg mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur text-neutral-900 py-3 font-semibold opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-neutral-900 hover:text-white flex items-center justify-center gap-2"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  Add to Bag
                </button>
              </div>
              <div className="flex justify-between items-start mb-1 px-1">
                <h3 className="serif text-lg font-bold text-neutral-900">{product.name}</h3>
                <span className="text-amber-700 font-semibold tracking-wide">${product.price.toLocaleString()}</span>
              </div>
              <p className="text-neutral-500 text-sm italic font-light line-clamp-2 px-1">{product.description}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-neutral-50 py-20 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="serif text-3xl font-bold mb-4 text-neutral-900">Aura Luxe</h2>
          <p className="text-neutral-500 max-w-md mx-auto mb-8 font-light italic">
            "Jewelry is like the perfect spice—it always complements what's already there."
          </p>
          <div className="flex justify-center gap-6 text-sm font-semibold tracking-widest uppercase text-neutral-400">
            <a href="#" className="hover:text-amber-600 transition-colors">About</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Store</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Heritage</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuyerView;