import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "@/api/productApi";
import type { Product } from "@/types/Product";
import ProductForm from "@/components/products/ProductForm";
import { useAuth0 } from "@auth0/auth0-react";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const token = await getAccessTokenSilently();
      const data = await getProducts(token);
      const found = data.find((p) => p._id === id);
      setProduct(found || null);
    };
    fetch();
  }, [id]);

  const handleSubmit = async (form: Omit<Product, "_id">) => {
    if (!id) return;
    const token = await getAccessTokenSilently();
    await updateProduct(id, form, token);
    navigate("/products");
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar producto</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}