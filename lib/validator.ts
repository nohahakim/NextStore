import { format } from "path";
import { z } from "zod";
import { formatNumberWithDecimal } from "@/lib/utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places (e.g. 49.99)"
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(255),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(255),
  brand: z.string().min(3, "Brand must be at least 3 characters").max(255),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number().int().min(0, "Stock must be at least 0"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().url().optional(),
  price: currency,
});
