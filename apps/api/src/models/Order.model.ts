import { Schema, model, Types } from "mongoose";
import type { OrderStatus, Size } from "@threadly/shared";

interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  size: Size;
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ICustomer {
  name: string;
  email: string;
  address: IAddress;
}

export interface IOrder {
  items: IOrderItem[];
  customer: ICustomer;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        size: { type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
      },
    ],
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true, default: "US" },
      },
    },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
