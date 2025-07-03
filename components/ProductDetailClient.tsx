'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Product, useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { dispatch } = useCart();
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    dispatch({ type: 'ADD_ITEM', payload: product });
    setIsAddingToCart(false);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              
              <p className="text-4xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Category:
                </span>
                <span className="text-sm text-gray-600 capitalize">
                  {product.category}
                </span>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}