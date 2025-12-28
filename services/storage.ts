
import { Product, Order } from '../types';

const PRODUCTS_KEY = 'aura_luxe_products';
const ORDERS_KEY = 'aura_luxe_orders';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Eternal Gold Ring',
    price: 1250,
    description: '18k solid gold band with a minimalist design, perfect for daily elegance.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    category: 'Rings'
  },
  {
    id: '2',
    name: 'Sapphire Teardrop Earrings',
    price: 2100,
    description: 'Deep blue sapphires encased in polished white gold filigree.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    category: 'Earrings'
  },
  {
    id: '3',
    name: 'Moonlight Pearl Necklace',
    price: 850,
    description: 'A delicate chain featuring a single, hand-selected freshwater pearl.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    category: 'Necklaces'
  }
];

export const getStoredProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(data);
};

export const saveProduct = (product: Product) => {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const deleteProduct = (id: string) => {
  const products = getStoredProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
};

export const getStoredOrders = (): Order[] => {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getStoredOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};
