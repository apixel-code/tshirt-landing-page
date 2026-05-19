import type { RequestHandler } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { productService } from "../services/product.service";
import type { ProductQuery } from "@threadly/shared";

export const getProducts: RequestHandler = asyncHandler(async (req, res) => {
  const query = req.query as ProductQuery;
  const products = await productService.findAll(query);
  res.json({ success: true, data: products });
});

export const getProductBySlug: RequestHandler = asyncHandler(async (req, res) => {
  const slug = req.params["slug"] as string;
  const product = await productService.findBySlug(slug);
  res.json({ success: true, data: product });
});
