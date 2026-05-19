import { z } from "zod";

export const CreateTestimonialSchema = z.object({
  author: z.string().min(1).max(100),
  location: z.string().optional(),
  avatar: z.string().url().optional(),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(1).max(1000),
  productRef: z.string().optional(),
});

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialSchema>;
