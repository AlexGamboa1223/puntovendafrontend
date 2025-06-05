import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
};

type OrderItem = {
  product: Product;
  quantity: number;
};

type Order = {
  items: OrderItem[];
  total: number;
  createdAt: string;
};

export default function SuccessPage() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!isAuthenticated) return;

        const token = await getAccessTokenSilently();
        const res = await axios.get<Order>(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders/latest`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrder(res.data);
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (loading) {
    return <p className="text-center mt-10">Cargando orden...</p>;
  }

  if (!order) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">No se encontró ninguna orden.</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Volver a la tienda
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="text-center mb-6">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-2" />
        <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
        <p className="text-gray-600">Esta es la confirmación de tu pedido:</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        {order.items.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} x ${item.product.price.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="flex justify-between pt-4 text-lg font-bold border-t">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-6">
        <Button onClick={() => navigate("/products")}>Seguir comprando</Button>
      </div>
    </div>
  );
}
