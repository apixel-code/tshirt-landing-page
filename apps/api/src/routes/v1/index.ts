import { Router } from "express";
import productRoutes from "./product.routes";
import categoryRoutes from "./category.routes";
import newsletterRoutes from "./newsletter.routes";
import orderRoutes from "./order.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/orders", orderRoutes);

export default router;
