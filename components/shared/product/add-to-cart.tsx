"use client";

import { toast } from "sonner";
import { CartItem, Cart } from "@/types";
import { Plus, Minus, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

type AddToCartProps = {
  variant: "simple" | "detailed";
  item: Omit<CartItem, "cartId">;
  cart?: Cart;
  isInStock: boolean;
};

const AddToCart = ({ variant, item, cart, isInStock }: AddToCartProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message, {
        action: (
          <button
            onClick={() => router.push("/cart")}
            className="px-3 py-1 rounded font-semibold text-white bg-green-700 hover:bg-green-800"
          >
            Go to cart
          </button>
        ),
      });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      if (res.success) {
        toast.success("Item removed from cart", {
          description: res.message,
        });
      } else {
        toast.error("Failed to remove item", {
          description: res.message,
        });
      }
    });
  };

  if (!isInStock) {
    if (variant === "simple") {
      return (
        <button
          disabled
          className="px-6 py-3 rounded-lg font-medium transition-all bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
        >
          Out of Stock
        </button>
      );
    } else {
      return (
        <div className="text-center text-red-500 font-semibold">
          This product is currently out of stock.
        </div>
      );
    }
  }

  if (variant === "simple") {
    return (
      <button
        onClick={handleAddToCart}
        className="px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-lg hover:-translate-y-0.5"
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          "Add to Cart"
        )}
      </button>
    );
  } else {
    const existItem = cart?.items.find((i) => i.productId === item.productId);
    if (existItem) {
      return (
        <div className="flex items-center justify-between bg-gradient-to-r from-brand-light/10 to-brand/10 dark:from-brand-dark/10 dark:to-brand-dark/10 p-6 rounded-2xl">
          <span className="text-lg font-bold text-brand dark:text-brand-light">
            {existItem.qty} in cart
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded p-2"
            >
              {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Minus size={16} />
              )}
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded p-2"
            >
              {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Plus size={16} />
              )}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <button
          onClick={handleAddToCart}
          className="w-full flex justify-center items-center bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-brand/30"
        >
          {isPending ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Plus size={16} className="inline-block mr-2" />
              Add to Cart
            </>
          )}
        </button>
      );
    }
  }
};

export default AddToCart;
