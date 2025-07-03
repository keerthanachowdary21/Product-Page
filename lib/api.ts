import { Product } from '@/contexts/CartContext';

const API_BASE_URL = 'https://fakestoreapi.com';

// Cache for storing API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function fetchProducts(): Promise<Product[]> {
  const cacheKey = 'products';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  setCachedData(cacheKey, data);
  return data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const cacheKey = `product-${id}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const data = await response.json();
  setCachedData(cacheKey, data);
  return data;
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const categoryMap: { [key: string]: string } = {
    'men': "men's clothing",
    'women': "women's clothing",
    'electronics': 'electronics',
    'jewelery': 'jewelery'
  };
  
  const apiCategory = categoryMap[category];
  if (!apiCategory) {
    throw new Error('Invalid category');
  }
  
  const cacheKey = `category-${category}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  const response = await fetch(`${API_BASE_URL}/products/category/${apiCategory}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  const data = await response.json();
  setCachedData(cacheKey, data);
  return data;
}

export async function fetchCategories(): Promise<string[]> {
  const cacheKey = 'categories';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  setCachedData(cacheKey, data);
  return data;
}