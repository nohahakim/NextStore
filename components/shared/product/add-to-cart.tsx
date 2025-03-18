"use client";

import { toast } from "sonner";
import { CartItem } from "@/types";

import { useRouter } from "next/navigation";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: Omit<CartItem, "cartId"> }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    // Execute the addItemToCart action
    const res = await addItemToCart(item);

    // If the action fails, display an error toast
    if (!res.success) {
      // Destructive-style toast, e.g. a red background
      toast.error(res.message);
      return;
    }

    // If the action is successful, redirect to the cart page
    toast.success(`${item.name} added to the cart`, {
      action: (
        // <button
        //   onClick={() => router.push("/cart")}
        //   className="bg-green-500 hover:bg-green-600 text-white font-semibold  rounded transition-colors"
        // >
        //   View Cart
        // </button>
        <button
          onClick={() => router.push("/cart")}
          className="px-3 py-1 rounded  font-semibold text-white bg-green-700 hover:bg-green-800"
        >
          Go to cart
        </button>
      ),
    });
  };

  return (
    <button
      className="w-full bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-brand/30"
      onClick={handleAddToCart} // Replace with your add-to-cart logic
    >
      Add to Cart <i className="ml-2 fas fa-shopping-bag"></i>
    </button>
  );
};
export default AddToCart;
