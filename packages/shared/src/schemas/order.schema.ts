import { z } from "zod";
import { SizeEnum } from "./product.schema";

export const OrderItemSchema = z.object({
  product: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  size: SizeEnum,
});

export const CustomerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1).default("US"),
  }),
});

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, "Order must have at least one item"),
  customer: CustomerSchema,
});

export const OrderStatusEnum = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
