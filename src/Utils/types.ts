export interface ProductItem {
  name: string;
  description: string;
  additional_description: string;
  category: string;
  isAvailable: boolean;
  variations: Variation[];
}

export interface Variation {
  size: string;
  color: string;
  price: {
    originalPrice: number;
    discountedPrice: number;
  };
  images: string[];
  countInStock: number;
}

export interface dashboardStats {
  customerCount: number;
  orderCount: number;
  productCount: number;
  returncount: number;
  replacementcount: number;
  totalSales: number;
  totalrevenue: number;
}

export interface order {
  id: string;
  amount: number;
  title: string;
  sold_on: number; // epoch
  qty: number;
  coverImg: string;
  customer: string;
}
