import React, { useState } from 'react';
import BuyerView from './components/BuyerView.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import CartModal from './components/CartModal.tsx';
import { ShoppingBagIcon, UserIcon } from './components/Icons.tsx';

const VIEW_MODES = {
  BUYER: 'BUYER',
  ADMIN: 'ADMIN'
};

const App = () => {
  const [viewMode, setViewMode] = useState(VIEW_MODES.BUYER);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleView = () => {
    const newMode = viewMode === VIEW_MODES.BUYER ? VIEW_MODES.ADMIN : VIEW_MODES.BUYER;
    setViewMode(newMode);
    if (newMode === VIEW_MODES.ADMIN) setIsCartOpen(false);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleClearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setViewMode(VIEW_MODES.BUYER)}
              className="serif text-2xl font-bold tracking-tighter text-neutral-900"
            >
              AURA LUXE
            </button>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setViewMode(VIEW_MODES.BUYER)}
                className={`text-sm font-medium transition-colors ${viewMode === VIEW_MODES.BUYER ? 'text-amber-700' : 'text-neutral-500 hover:text-neutral-900'}`}
              >
                Collections
              </button>
              <button 
                onClick={() => setViewMode(VIEW_MODES.ADMIN)}
                className={`text-sm font-medium transition-colors ${viewMode === VIEW_MODES.ADMIN ? 'text-amber-700' : 'text-neutral-500 hover:text-neutral-900'}`}
              >
                Admin Panel
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {viewMode === VIEW_MODES.BUYER && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-700 hover:bg-neutral-50 rounded-full transition-colors"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white translate-x-1 -translate-y-1">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            <button 
              onClick={toggleView}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === VIEW_MODES.ADMIN 
                ? 'bg-amber-50 text-amber-700 border border-amber-100' 
                : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <UserIcon className="w-5 h-5" />
              <span className="hidden sm:inline">{viewMode === VIEW_MODES.ADMIN ? 'Switch to Buyer' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {viewMode === VIEW_MODES.BUYER ? (
          <BuyerView 
            onAddToCart={handleAddToCart} 
            cartCount={cartCount} 
            onOpenCart={() => setIsCartOpen(true)} 
          />
        ) : (
          <AdminPanel />
        )}
      </main>

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default App;