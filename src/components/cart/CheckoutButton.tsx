import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import { createCheckoutSession } from "@/api/useCreateCheckoutSession";
import type { CartItem } from "@/types/Cart";

interface Props {
  cartItems: CartItem[];
}

export default function CheckoutButton({ cartItems }: Props) {
  const { getAccessTokenSilently } = useAuth0();

  const handleCheckout = async () => {
    const token = await getAccessTokenSilently();
    const url = await createCheckoutSession(token, cartItems);
    window.location.href = url;
  };

  return (
    <Button className="w-full mt-4" onClick={handleCheckout}>
      Proceder al pago
    </Button>
  );
}
