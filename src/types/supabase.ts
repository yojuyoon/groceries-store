// types/supabase.ts
export type Product = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  unit: string;
  price: number;
  in_stock: number;
  category?: string;
  subcategory?: string;
  created_at: string;
};

export type Order = {
  id: string;
  user_email: string;
  recipient_name: string;
  address_street: string;
  address_city: string;
  address_state: string;
  mobile: string;
  total_amount: number;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
};
