import { Suspense } from 'react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/api';
import Link from 'next/link';

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function FeaturedProducts() {
  const products = await fetchProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the most popular items
            </p>
          </div>
          
          <Suspense fallback={<ProductsLoading />}>
            <FeaturedProducts />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Men\'s Clothing', href: '/products/men', emoji: '👔' },
              { name: 'Women\'s Clothing', href: '/products/women', emoji: '👗' },
              { name: 'Electronics', href: '/products/electronics', emoji: '📱' },
              { name: 'Jewelery', href: '/products/jewelery', emoji: '💍' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group p-8 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                <div className="text-4xl mb-4">{category.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}