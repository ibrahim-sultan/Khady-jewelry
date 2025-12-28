
import React, { useState } from 'react';
import { TrashIcon } from './Icons.js';
import { saveOrder } from '../services/storage.js';

const CartModal = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onClearCart }) => {
  const [step, setStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now().toString(),
      items: [...items],
      total: total,
      customerName: customerInfo.name,
      email: customerInfo.email,
      address: customerInfo.address,
      phone: customerInfo.phone,
      date: new Date().toISOString(),
      status: 'Paid'
    };
    saveOrder(newOrder);
    setStep('success');
    onClearCart();
  };

  const closeAndReset = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="serif text-2xl font-bold">
            {step === 'cart' ? 'Your Shopping Bag' : step === 'checkout' ? 'Shipping Details' : 'Purchase Complete'}
          </h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">&times; Close</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-neutral-400 mb-4">Your bag is empty.</p>
                  <button onClick={onClose} className="text-amber-700 font-semibold underline">Discover Pieces</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} className="w-20 h-20 object-cover rounded-lg" alt={item.name} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-800">{item.name}</h4>
                        <p className="text-sm text-amber-700 font-medium">${item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-xs hover:bg-neutral-50"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-xs hover:bg-neutral-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-neutral-300 hover:text-rose-500">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 mb-6 text-sm text-amber-800">
                You are about to pay <strong>${total.toLocaleString()}</strong> for <strong>{items.length}</strong> items.
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Full Name</label>
                <input 
                  type="text" required
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Email</label>
                  <input 
                    type="email" required
                    value={customerInfo.email}
                    onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Phone</label>
                  <input 
                    type="tel" required
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Delivery Address</label>
                <textarea 
                  required
                  value={customerInfo.address}
                  onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  rows={4}
                ></textarea>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="serif text-2xl font-bold">Thank You!</h3>
              <p className="text-neutral-500">Your order has been received and is being processed. An email confirmation has been sent to {customerInfo.email}.</p>
              <button 
                onClick={closeAndReset}
                className="mt-6 w-full py-4 bg-neutral-900 text-white font-bold rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {step !== 'success' && (
          <div className="p-6 border-t border-neutral-100 bg-neutral-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-neutral-500 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-neutral-900">${total.toLocaleString()}</span>
            </div>
            
            {step === 'cart' ? (
              <button 
                disabled={items.length === 0}
                onClick={() => setStep('checkout')}
                className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl tracking-widest uppercase text-sm hover:bg-neutral-800 disabled:opacity-50 transition-colors"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep('cart')}
                  className="w-1/3 py-4 bg-white border border-neutral-200 text-neutral-600 font-bold rounded-xl text-sm"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-4 bg-amber-700 text-white font-bold rounded-xl tracking-widest uppercase text-sm hover:bg-amber-800 transition-colors"
                >
                  Pay Online Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
