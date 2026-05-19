import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  image?: string;
  description?: string;
  active: boolean;
  sortOrder: number;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
