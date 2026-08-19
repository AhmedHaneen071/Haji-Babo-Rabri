import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Haji Babo Rabri`,
      description: product.shortDescription,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
