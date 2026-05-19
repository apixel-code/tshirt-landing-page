import { Router } from "express";
import { createOrder } from "../../controllers/order.controller";
import { validate } from "../../middleware/validate";
import { CreateOrderSchema } from "@threadly/shared";

const router = Router();

router.post("/", validate(CreateOrderSchema), createOrder);

export default router;
