import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema, target: "body" | "query" = "body"): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message } });
      return;
    }
    (req as Record<string, unknown>)[target] = result.data;
    next();
  };
