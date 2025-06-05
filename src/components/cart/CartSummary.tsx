import type { CartItem } from "@/types/Cart";
import { Button } from "../ui/button";
import CheckoutButton from "./CheckoutButton";

interface Props {
  cartItems: CartItem[];
  onRemove: (productId: string) => void;
  onClear?: () => void;
}

export default function CartSummary({ cartItems, onRemove, onClear }: Props) {
  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Carrito</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">El carrito está vacío.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => {
            const product = item.product;
            if (!product) return null;

            return (
              <li
                key={product._id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${product.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove(product._id)}
                >
                  Quitar
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="mt-4">
            <p className="font-bold text-right">Total: ${total.toFixed(2)}</p>
            <CheckoutButton cartItems={cartItems} />

          </div>

          {onClear && (
            <div className="mt-2 text-right">
              <Button variant="destructive" size="sm" onClick={onClear}>
                Vaciar carrito
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
