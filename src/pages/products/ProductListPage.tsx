import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getProducts, deleteProduct } from "@/api/productApi";
import type { Product } from "@/types/Product";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const loadProducts = async () => {
    const token = await getAccessTokenSilently();
    const data = await getProducts(token);
    setProducts(data);
  };

  const handleDelete = async (id: string) => {
    const token = await getAccessTokenSilently();
    await deleteProduct(id, token);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Button onClick={() => navigate("/products/add")}>Agregar producto</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
