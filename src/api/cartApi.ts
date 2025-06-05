import axios from "axios";
import type { CartItem } from "@/types/Cart";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/cart`;

// Obtener el carrito del usuario
export const getCart = async (token: string): Promise<CartItem[]> => {
  const res = await axios.get<{ items: CartItem[] }>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.items;
};

// Agregar un producto al carrito
export const addToCart = async (
  productId: string,
  quantity: number,
  token: string
): Promise<CartItem[]> => {
  const res = await axios.post<{ items: CartItem[] }>(
    API_URL,
    { productId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.items;
};

// Eliminar un producto del carrito
export const removeFromCart = async (
  productId: string,
  token: string
): Promise<CartItem[]> => {
  const res = await axios.delete<{ items: CartItem[] }>(
    `${API_URL}/${productId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.items;
};

// Vaciar completamente el carrito (POST /api/cart/clear)
export const clearCart = async (token: string): Promise<void> => {
  await axios.post(`${API_URL}/clear`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
