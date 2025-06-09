import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

type OrderItem = {
  product: Product;
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
};

export default function OrdersPage() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!isAuthenticated) return;

        const token = await getAccessTokenSilently();
        const res = await axios.get<Order[]>(
          `${import.meta.env.VITE_API_BASE_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (error) {
        console.error("Error al obtener historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (loading) {
    return <p className="text-center mt-10">Cargando historial...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Aún no tienes compras registradas.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Historial de compras</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Fecha:{" "}
                {format(new Date(order.createdAt), "PPPpp", { locale: es })}
              </span>
              <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
            </div>

            <ul className="divide-y">
              {order.items.map((item) => (
                <li key={item.product._id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
