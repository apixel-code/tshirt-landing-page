import { Subscriber } from "../models/Newsletter.model";
import { HttpError } from "../middleware/errorHandler";
import type { SubscribeInput } from "@threadly/shared";

export const newsletterService = {
  async subscribe(input: SubscribeInput) {
    const existing = await Subscriber.findOne({ email: input.email.toLowerCase() });
    if (existing) {
      if (existing.active) {
        throw new HttpError(409, "ALREADY_SUBSCRIBED", "This email is already subscribed");
      }
      existing.active = true;
      await existing.save();
      return existing;
    }
    return Subscriber.create(input);
  },
};
