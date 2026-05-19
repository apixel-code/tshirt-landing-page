import { Order } from "../models/Order.model";
import { Product } from "../models/Product.model";
import { HttpError } from "../middleware/errorHandler";
import type { CreateOrderInput } from "@threadly/shared";
import mongoose from "mongoose";

export const orderService = {
  async create(input: CreateOrderInput) {
    const productIds = input.items.map((i) => new mongoose.Types.ObjectId(i.product));
    const products = await Product.find({ _id: { $in: productIds } }).lean();

    if (products.length !== input.items.length) {
      throw new HttpError(
        400,
        "INVALID_PRODUCTS",
        "One or more products in the order do not exist"
      );
    }

    for (const item of input.items) {
      const product = products.find((p) => p._id.toString() === item.product);
      if (!product) continue;
      if (!product.inStock || product.stock < item.quantity) {
        throw new HttpError(
          400,
          "INSUFFICIENT_STOCK",
          `"${product.name}" does not have enough stock for the requested quantity`
        );
      }
    }

    const total = input.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({ ...input, total, status: "pending" });
    return order;
  },
};
