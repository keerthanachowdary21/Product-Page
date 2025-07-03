'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

  const updateQuantity = async (id: number, quantity: number) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const removeItem = async (id: number) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Add some products to get started
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart ({state.itemCount} items)
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg shadow-sm border p-6 transition-opacity duration-200 ${
                    updatingItems.has(item.id) ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain bg-gray-50 rounded-lg p-2"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize mb-2">
                        {item.category}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updatingItems.has(item.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      
                      <span className="text-lg font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updatingItems.has(item.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={updatingItems.has(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      ${(state.total * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mb-4">
                Proceed to Checkout
              </button>
              
              <Link
                href="/products"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}