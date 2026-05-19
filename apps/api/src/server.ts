import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";
import v1Router from "./routes/v1/index";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env["PORT"] ?? 5000;

app.use(helmet());
app.use(cors({ origin: process.env["CLIENT_ORIGIN"] ?? "*" }));
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ success: true, data: "Threadly API is running" });
});

app.use("/api/v1", v1Router);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error("Failed to connect to MongoDB, aborting startup:", err);
    process.exit(1);
  });
