import ProductForm from "@/components/products/ProductForm";
import { createProduct, deleteProduct, getProducts } from "@/api/productApi";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductCard from "@/components/products/ProductCard";
import { toast } from "sonner";
import type { Product } from "@/types/Product";

export default function AddProductPage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const handleSubmit = async (form: Omit<Product, "_id">) => {
    try {
      const token = await getAccessTokenSilently();
      await createProduct(form, token);
      toast.success("Producto agregado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      toast.error("Error al agregar el producto");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteProduct(id, token);
      toast.success("Producto eliminado");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      toast.error("Error al eliminar producto");
    }
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return await getProducts(token);
    },
  });

  return (
    <div className="p-6 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Agregar nuevo producto</h1>
        <ProductForm onSubmit={handleSubmit} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Productos existentes</h2>
        {isLoading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No hay productos agregados aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={() => handleDelete(product._id)}
                onEdit={() => navigate(`/products/edit/${product._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
