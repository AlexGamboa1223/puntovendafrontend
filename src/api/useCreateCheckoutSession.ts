import axios from "axios";
import type { CartItem } from "@/types/Cart";

type CheckoutSessionResponse = {
  url: string;
};

export const createCheckoutSession = async (
  token: string,
  cartItems: CartItem[]
): Promise<string> => {
  const response = await axios.post<CheckoutSessionResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/orders/create-checkout-session`,
    { cartItems },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.url;
};
