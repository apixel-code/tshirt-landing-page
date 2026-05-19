import { Schema, model, Types } from "mongoose";
import type { Size } from "@threadly/shared";

interface IColor {
  name: string;
  hex: string;
}

export interface IProduct {
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  sizes: Size[];
  colors: IColor[];
  category: Types.ObjectId;
  stock: number;
  featured: boolean;
  salesCount: number;
  inStock: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number },
    images: [{ type: String }],
    sizes: [{ type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"] }],
    colors: [{ name: { type: String }, hex: { type: String } }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false, index: true },
    salesCount: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
