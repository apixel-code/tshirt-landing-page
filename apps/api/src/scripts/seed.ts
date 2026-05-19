import "dotenv/config";
import mongoose from "mongoose";
import { Category } from "../models/Category.model";
import { Product } from "../models/Product.model";

const MONGODB_URI = process.env["MONGODB_URI"] ?? "mongodb://localhost:27017/threadly";

const img = (id: number) => `https://picsum.photos/seed/tshirt${id}/600/750`;

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await Promise.all([Category.deleteMany({}), Product.deleteMany({})]);
  console.log("Cleared existing data");

  const categories = await Category.insertMany([
    {
      name: "Oversized",
      slug: "oversized",
      description: "Relaxed, dropped-shoulder fits",
      sortOrder: 0,
      active: true,
    },
    {
      name: "Graphics",
      slug: "graphics",
      description: "Bold prints and artistic designs",
      sortOrder: 1,
      active: true,
    },
    {
      name: "Basics",
      slug: "basics",
      description: "Clean essentials for every wardrobe",
      sortOrder: 2,
      active: true,
    },
    {
      name: "Collabs",
      slug: "collabs",
      description: "Limited artist and brand collaborations",
      sortOrder: 3,
      active: true,
    },
  ]);

  const [oversized, graphics, basics, collabs] = categories as typeof categories;

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
  const coreSizes = ["S", "M", "L", "XL"] as const;

  await Product.insertMany([
    // ── Oversized ──────────────────────────────────────────────────────────
    {
      name: "The Drop Tee",
      slug: "the-drop-tee",
      description: "Our signature oversized drop-shoulder tee in heavyweight 320gsm cotton.",
      price: 59,
      comparePrice: 75,
      images: [img(1), img(2)],
      sizes: allSizes,
      colors: [
        { name: "Off-Black", hex: "#0F0F0F" },
        { name: "Chalk", hex: "#F5F5F0" },
      ],
      category: oversized._id,
      stock: 80,
      featured: true,
      salesCount: 412,
    },
    {
      name: "Tokyo Oversized",
      slug: "tokyo-oversized",
      description: "Inspired by Harajuku street culture — boxy fit, raw hem finish.",
      price: 64,
      images: [img(3), img(4)],
      sizes: allSizes,
      colors: [
        { name: "Washed Slate", hex: "#6B7280" },
        { name: "Bone", hex: "#E8E4D9" },
      ],
      category: oversized._id,
      stock: 55,
      featured: true,
      salesCount: 287,
    },
    {
      name: "Heavy Wash Tee",
      slug: "heavy-wash-tee",
      description: "Enzyme-washed for a lived-in vintage feel from day one.",
      price: 54,
      images: [img(5), img(6)],
      sizes: allSizes,
      colors: [
        { name: "Faded Black", hex: "#2C2C2C" },
        { name: "Vintage Cream", hex: "#FFFAEF" },
      ],
      category: oversized._id,
      stock: 40,
      featured: false,
      salesCount: 198,
    },

    // ── Graphics ───────────────────────────────────────────────────────────
    {
      name: "Chaos Print Tee",
      slug: "chaos-print-tee",
      description: "All-over abstract ink splash print on a 280gsm base.",
      price: 72,
      comparePrice: 89,
      images: [img(7), img(8)],
      sizes: coreSizes,
      colors: [{ name: "Off-Black", hex: "#0F0F0F" }],
      category: graphics._id,
      stock: 30,
      featured: true,
      salesCount: 341,
    },
    {
      name: "Abstract Series No.1",
      slug: "abstract-series-no1",
      description: "First drop from our in-house artist series. Screen-printed in Berlin.",
      price: 79,
      images: [img(9), img(10)],
      sizes: coreSizes,
      colors: [
        { name: "Arctic White", hex: "#FAFAFA" },
        { name: "Off-Black", hex: "#0F0F0F" },
      ],
      category: graphics._id,
      stock: 22,
      featured: true,
      salesCount: 276,
    },
    {
      name: "Flame Logo Tee",
      slug: "flame-logo-tee",
      description: "Embroidered flame wordmark on a relaxed midweight cut.",
      price: 58,
      images: [img(11), img(12)],
      sizes: allSizes,
      colors: [
        { name: "Tangerine", hex: "#FF6B35" },
        { name: "Black", hex: "#0F0F0F" },
      ],
      category: graphics._id,
      stock: 65,
      featured: false,
      salesCount: 189,
    },

    // ── Basics ─────────────────────────────────────────────────────────────
    {
      name: "Core White Tee",
      slug: "core-white-tee",
      description: "Heavyweight 300gsm Supima cotton. The only white tee you'll ever need.",
      price: 38,
      images: [img(13), img(14)],
      sizes: allSizes,
      colors: [{ name: "White", hex: "#FFFFFF" }],
      category: basics._id,
      stock: 200,
      featured: false,
      salesCount: 924,
    },
    {
      name: "Core Black Tee",
      slug: "core-black-tee",
      description: "Same great 300gsm Supima cut in our deepest dye black.",
      price: 38,
      images: [img(15), img(16)],
      sizes: allSizes,
      colors: [{ name: "Black", hex: "#0A0A0A" }],
      category: basics._id,
      stock: 200,
      featured: false,
      salesCount: 876,
    },
    {
      name: "Core Slate Tee",
      slug: "core-slate-tee",
      description: "The versatile mid-tone — transitions from gym to street effortlessly.",
      price: 38,
      images: [img(17), img(18)],
      sizes: allSizes,
      colors: [{ name: "Slate", hex: "#64748B" }],
      category: basics._id,
      stock: 150,
      featured: false,
      salesCount: 611,
    },

    // ── Collabs ────────────────────────────────────────────────────────────
    {
      name: "Artist Series #01",
      slug: "artist-series-01",
      description: "Collaboration with muralist Dae-Jung Lim. 150 pieces worldwide.",
      price: 110,
      comparePrice: 130,
      images: [img(19), img(20)],
      sizes: coreSizes,
      colors: [{ name: "Ecru", hex: "#F0EAD6" }],
      category: collabs._id,
      stock: 18,
      featured: true,
      salesCount: 132,
    },
    {
      name: "Limited × Studio Nōma",
      slug: "limited-studio-noma",
      description: "A Scandinavian-inspired capsule: minimal typography, premium drape.",
      price: 95,
      images: [img(21), img(22)],
      sizes: coreSizes,
      colors: [
        { name: "Fog", hex: "#D1D5DB" },
        { name: "Forest", hex: "#14532D" },
      ],
      category: collabs._id,
      stock: 25,
      featured: true,
      salesCount: 214,
    },
    {
      name: "Creator Pack Tee",
      slug: "creator-pack-tee",
      description: "Designed with five micro-creators — each colorway tells a different story.",
      price: 82,
      images: [img(23), img(24)],
      sizes: allSizes,
      colors: [
        { name: "Accent Orange", hex: "#FF4D00" },
        { name: "Off-Black", hex: "#0F0F0F" },
        { name: "Chalk", hex: "#F5F5F0" },
      ],
      category: collabs._id,
      stock: 48,
      featured: true,
      salesCount: 309,
    },
  ]);

  const productCount = await Product.countDocuments();
  const featuredCount = await Product.countDocuments({ featured: true });
  console.log(
    `Seeded ${categories.length} categories and ${productCount} products (${featuredCount} featured)`
  );
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err: unknown) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
