import type { RequestHandler } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { newsletterService } from "../services/newsletter.service";
import type { SubscribeInput } from "@threadly/shared";

export const subscribe: RequestHandler = asyncHandler(async (req, res) => {
  const input = req.body as SubscribeInput;
  const subscriber = await newsletterService.subscribe(input);
  res.status(201).json({ success: true, data: { email: subscriber.email } });
});
