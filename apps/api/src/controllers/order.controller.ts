import type { RequestHandler } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { orderService } from "../services/order.service";
import type { CreateOrderInput } from "@threadly/shared";

export const createOrder: RequestHandler = asyncHandler(async (req, res) => {
  const input = req.body as CreateOrderInput;
  const order = await orderService.create(input);
  res.status(201).json({ success: true, data: order });
});
