
export enum ViewMode {
  BUYER = 'BUYER',
  ADMIN = 'ADMIN'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  email: string;
  address: string;
  phone: string;
  date: string;
  status: 'Paid' | 'Processing' | 'Shipped';
}
