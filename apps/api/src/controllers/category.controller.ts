import type { RequestHandler } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { categoryService } from "../services/category.service";

export const getCategories: RequestHandler = asyncHandler(async (_req, res) => {
  const categories = await categoryService.findAll();
  res.json({ success: true, data: categories });
});
