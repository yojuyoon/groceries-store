// stores/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  productId: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (productId, quantity) => {
        const existing = get().items.find(
          (item) => item.productId === productId
        );
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, { productId, quantity }] });
        }
      },

      removeFromCart: (productId) =>
        set({
          items: get().items.filter((item) => item.productId !== productId),
        }),

      updateQuantity: (productId, quantity) =>
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
