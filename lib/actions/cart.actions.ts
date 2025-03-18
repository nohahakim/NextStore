"use server";

import { CartItem } from "@/types";

export async function addItemToCart(data: CartItem) {
  // Simulate adding the item to the cart
  return {
    success: true,
    message: "Item added to the cart",
  };
}
