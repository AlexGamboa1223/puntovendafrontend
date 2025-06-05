// src/pages/ProductsPage.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productApi";
import {
  getCart,
  addToCart as addToCartApi,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
} from "@/api/cartApi";
import { useAuth0 } from "@auth0/auth0-react";
import ProductCard from "@/components/products/ProductCard";
import CartSummary from "@/components/cart/CartSummary"; 
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/Product";
import type { CartItem } from "@/types/Cart";


export default function ProductsPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return await getProducts(token);
    },
  });

  // 🔄 Cargar carrito al montar
  useEffect(() => {
    const fetchCart = async () => {
      const token = await getAccessTokenSilently();
      const data = await getCart(token);
      setCart(data);
    };
    fetchCart();
  }, []);

  // ➕ Agregar al carrito
  const addToCart = async (product: Product) => {
    const token = await getAccessTokenSilently();
    const updated = await addToCartApi(product._id, 1, token);
    setCart(updated);
  };

  // ➖ Eliminar del carrito
  const removeFromCart = async (productId: string) => {
    const token = await getAccessTokenSilently();
    const updated = await removeFromCartApi(productId, token);
    setCart(updated);
  };

  // ❌ Vaciar carrito
  const clearCart = async () => {
    const token = await getAccessTokenSilently();
    await clearCartApi(token);
    setCart([]);
  };

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        <Input
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        {isLoading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No hay productos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🛒 Carrito a la derecha */}
      <CartSummary
        cartItems={cart}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </div>
  );
}
