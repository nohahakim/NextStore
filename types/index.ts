import { z } from "zod";
import { insertProductSchema } from "@/lib/validator";
import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from "@/lib/validator";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};
export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
