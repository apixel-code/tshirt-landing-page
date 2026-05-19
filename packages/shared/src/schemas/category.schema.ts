import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  image: z.string().url().optional(),
  description: z.string().optional(),
  active: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
