import { Router } from "express";
import { getProducts, getProductBySlug } from "../../controllers/product.controller";
import { validate } from "../../middleware/validate";
import { ProductQuerySchema } from "@threadly/shared";

const router = Router();

router.get("/", validate(ProductQuerySchema, "query"), getProducts);
router.get("/:slug", getProductBySlug);

export default router;
