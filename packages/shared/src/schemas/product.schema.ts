import { z } from "zod";

export const SizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL"]);

export const ColorSchema = z.object({
  name: z.string().min(1),
  hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex colour (#RRGGBB)"),
});

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().optional(),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  images: z.array(z.string().url()).min(1),
  sizes: z.array(SizeEnum).min(1),
  colors: z.array(ColorSchema).min(1),
  category: z.string().min(1),
  stock: z.number().int().min(0),
  featured: z.boolean().default(false),
  salesCount: z.number().int().min(0).default(0),
});

export const ProductQuerySchema = z.object({
  featured: z.preprocess(
    (v) => (v === "true" ? true : v === "false" ? false : undefined),
    z.boolean().optional()
  ),
  limit: z.preprocess(
    (v) => (v !== undefined ? Number(v) : undefined),
    z.number().int().positive().max(100).optional()
  ),
  category: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type ProductQuery = z.infer<typeof ProductQuerySchema>;
export type Size = z.infer<typeof SizeEnum>;
export type Color = z.infer<typeof ColorSchema>;
