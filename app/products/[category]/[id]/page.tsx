import { fetchProductById, fetchProducts } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

interface PageProps {
  params: {
    category: string;
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    
    return products.map((product) => ({
      category: product.category.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  try {
    const product = await fetchProductById(params.id);
    
    if (!product) {
      notFound();
    }
    
    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}