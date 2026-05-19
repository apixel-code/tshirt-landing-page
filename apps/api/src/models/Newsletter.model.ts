import { Schema, model } from "mongoose";

export interface ISubscriber {
  email: string;
  subscribedAt: Date;
  active: boolean;
}

const subscriberSchema = new Schema<ISubscriber>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

export const Subscriber = model<ISubscriber>("Subscriber", subscriberSchema);
