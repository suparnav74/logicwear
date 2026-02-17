export interface Variant {
  sku: string;
  size: string;
  color: string;
  price: number;
  availableQty: number;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  image: string;
  variants: Variant[];
}
