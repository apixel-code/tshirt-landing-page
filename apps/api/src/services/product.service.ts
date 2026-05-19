import { Product } from "../models/Product.model";
import { HttpError } from "../middleware/errorHandler";
import type { ProductQuery } from "@threadly/shared";

export const productService = {
  async findAll(query: ProductQuery) {
    const filter: Record<string, unknown> = {};
    if (query.featured !== undefined) filter["featured"] = query.featured;
    if (query.category) filter["category"] = query.category;

    return Product.find(filter)
      .populate("category", "name slug image")
      .limit(query.limit ?? 50)
      .sort({ createdAt: -1 })
      .lean();
  },

  async findBySlug(slug: string) {
    const product = await Product.findOne({ slug }).populate("category", "name slug image").lean();
    if (!product) {
      throw new HttpError(404, "PRODUCT_NOT_FOUND", `No product found with slug "${slug}"`);
    }
    return product;
  },
};
