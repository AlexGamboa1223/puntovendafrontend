// src/api/productApi.ts
import axios from "axios";
import type { Product } from "@/types/Product";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}/api`;

export const getProducts = async (token: string): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Corregido: ya no usamos FormData, solo JSON
export const createProduct = async (product: Omit<Product, "_id">, token: string): Promise<Product> => {
  const res = await axios.post<Product>(`${API_URL}/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const updateProduct = async (id: string, product: Omit<Product, "_id">, token: string): Promise<Product> => {
  const res = await axios.put<Product>(`${API_URL}/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const deleteProduct = async (id: string, token: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
  