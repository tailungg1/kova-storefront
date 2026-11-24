export type CategoryFilter = 'All' | 'Apparel' | 'Accessories' | 'Curated Sets';

export type ProductCategory = 'Apparel' | 'Accessories' | 'Curated Sets';

export type ProductSize = 'S' | 'M' | 'L' | 'One Size';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  priceGbp: number;
  salePriceGbp?: number;
  discountLabel?: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  material: string;
  care: string;
  sizes: ProductSize[];
  colorName: string;
}

export interface CartItem {
  productId: string;
  size: ProductSize;
  quantity: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  productId: string;
  productTitle: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}