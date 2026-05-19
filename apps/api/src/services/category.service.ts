import { Category } from "../models/Category.model";
import { HttpError } from "../middleware/errorHandler";

export const categoryService = {
  async findAll() {
    return Category.find({ active: true }).sort({ sortOrder: 1, name: 1 }).lean();
  },

  async findBySlug(slug: string) {
    const category = await Category.findOne({ slug, active: true }).lean();
    if (!category) {
      throw new HttpError(404, "CATEGORY_NOT_FOUND", `No category found with slug "${slug}"`);
    }
    return category;
  },
};
