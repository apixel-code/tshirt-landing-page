import { Router } from "express";
import { subscribe } from "../../controllers/newsletter.controller";
import { validate } from "../../middleware/validate";
import { SubscribeSchema } from "@threadly/shared";

const router = Router();

router.post("/subscribe", validate(SubscribeSchema), subscribe);

export default router;
