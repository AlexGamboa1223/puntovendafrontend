import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getProducts } from "@/api/productApi";
import type { Product } from "@/types/Product";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import landingImage from '../assets/landing.png';

export default function HomePage() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await getProducts(token);
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar productos", err);
      }
    };

    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col gap-12">
      {/* Sección principal */}
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-blue-600">
          Disfruta tu pedido
        </h1>
        <span className="text-xl">¡Tu pedido a un solo click!</span>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <img src={landingImage} className="rounded-xl shadow-md" />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
              Tu pedido aún más rápido
            </span>
          </div>
        </div>
      </div>

      {/* Sección de Inventario */}
      {isAuthenticated && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600">Inventario actual</h2>
            <Button onClick={() => navigate("/products/add")}>Agregar producto</Button>
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500">No hay productos registrados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product._id} className="border p-4 rounded shadow-sm bg-gray-50 hover:shadow-lg transition">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded" />
                  <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
                  <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
