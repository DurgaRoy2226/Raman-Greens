import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback JSON DB file path
const JSON_DB_PATH = path.join(__dirname, "products.json");

// Default product catalog to seed the database
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Nimari Masala Sev",
    category: "Snacks",
    price: 180,
    oldPrice: 220,
    rating: 4.8,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Hand-rolled gram flour sev seasoned with the fiery red chillies of Nimar. A tea-time legend from the bylanes of Khandwa.",
    benefits: ["High in protein", "Zero trans-fat", "Stone-ground spices", "No preservatives"],
    nutrition: [
      { label: "Energy", value: "510 kcal" },
      { label: "Protein", value: "18 g" },
      { label: "Carbs", value: "52 g" },
      { label: "Fat", value: "26 g" }
    ],
    tags: ["spicy", "tea-time", "crunchy", "bestseller"],
    bestseller: true,
    trending: true,
    stock: 48,
    weight: "400g",
    origin: "Khandwa, MP"
  },
  {
    id: "p2",
    name: "Khandwa Garlic Chivda",
    category: "Snacks",
    price: 160,
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A perfectly balanced flattened-rice mix with roasted peanuts, curry leaves and Nimari garlic.",
    benefits: ["Light & crunchy", "Roasted, not fried", "Rich in fibre"],
    nutrition: [
      { label: "Energy", value: "430 kcal" },
      { label: "Protein", value: "11 g" },
      { label: "Carbs", value: "58 g" },
      { label: "Fat", value: "16 g" }
    ],
    tags: ["savoury", "light", "garlic"],
    bestseller: true,
    stock: 60,
    weight: "350g",
    origin: "Khandwa, MP"
  },
  {
    id: "p3",
    name: "Organic Toor Dal",
    category: "Organics",
    price: 240,
    oldPrice: 280,
    rating: 4.9,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1599909533776-aaae46a09a8b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Sun-dried, unpolished toor dal grown by certified organic farmers across Nimar's fertile black-soil belt.",
    benefits: ["100% organic", "Unpolished", "No pesticides", "Nimari heirloom variety"],
    nutrition: [
      { label: "Energy", value: "343 kcal" },
      { label: "Protein", value: "22 g" },
      { label: "Carbs", value: "62 g" },
      { label: "Fibre", value: "15 g" }
    ],
    tags: ["organic", "dal", "healthy"],
    trending: true,
    stock: 120,
    weight: "1 kg",
    origin: "Nimar Belt, MP"
  },
  {
    id: "p4",
    name: "Cold-Pressed Groundnut Oil",
    category: "Organics",
    price: 460,
    rating: 4.8,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80"],
    description: "Wood-pressed (kachi ghani) groundnut oil from Nimari peanuts. Aromatic, golden, and unrefined.",
    benefits: ["Cold-pressed", "Heart-friendly", "High smoke point", "Chemical-free"],
    nutrition: [
      { label: "Energy", value: "884 kcal/100ml" },
      { label: "MUFA", value: "46 g" },
      { label: "PUFA", value: "32 g" }
    ],
    tags: ["oil", "organic", "cooking"],
    stock: 35,
    weight: "1 L",
    origin: "Khandwa, MP"
  },
  {
    id: "p5",
    name: "Nimari Festive Hamper",
    category: "Gifting",
    price: 1499,
    oldPrice: 1799,
    rating: 5.0,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A hand-curated wooden box featuring 6 of Nimar's treasures — sev, chivda, gud-papdi, dry fruit chikki, jaggery & spice mix.",
    benefits: ["Premium wooden box", "6 artisanal treats", "Customisable note", "Free gift wrap"],
    nutrition: [{ label: "Pieces", value: "6 items" }],
    tags: ["gift", "festive", "premium", "hamper"],
    bestseller: true,
    trending: true,
    stock: 22,
    weight: "1.8 kg",
    origin: "Khandwa, MP"
  },
  {
    id: "p6",
    name: "Pure Desi Gud (Jaggery)",
    category: "Organics",
    price: 140,
    rating: 4.6,
    reviews: 174,
    image: "https://images.unsplash.com/photo-1610450949065-1f2841536c8c?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1610450949065-1f2841536c8c?auto=format&fit=crop&w=900&q=80"],
    description: "Chemical-free sugarcane jaggery from Nimar's farms. Rich, mineral-packed and naturally sweet.",
    benefits: ["No sulphur", "Iron-rich", "Traditional method"],
    nutrition: [
      { label: "Energy", value: "383 kcal" },
      { label: "Iron", value: "11 mg" }
    ],
    tags: ["sweet", "natural", "winter"],
    stock: 80,
    weight: "500g",
    origin: "Nimar Belt, MP"
  },
  {
    id: "p7",
    name: "Mawa Gud-Papdi",
    category: "Sweets",
    price: 280,
    rating: 4.7,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=900&q=80"],
    description: "A melt-in-mouth winter delicacy of wheat flour, ghee and jaggery — a Nimari grandmother's recipe.",
    benefits: ["Pure desi ghee", "Hand-stirred", "Winter superfood"],
    nutrition: [
      { label: "Energy", value: "480 kcal" },
      { label: "Carbs", value: "55 g" },
      { label: "Fat", value: "24 g" }
    ],
    tags: ["sweet", "winter", "ghee"],
    stock: 30,
    weight: "400g",
    origin: "Khandwa, MP"
  },
  {
    id: "p8",
    name: "Nimari Red Chilli Powder",
    category: "Spices",
    price: 220,
    rating: 4.9,
    reviews: 305,
    image: "https://images.unsplash.com/photo-1599909533776-aaae46a09a8b?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1599909533776-aaae46a09a8b?auto=format&fit=crop&w=900&q=80"],
    description: "Sun-dried Nimari red chillies, stone-ground to a fiery, fragrant powder. Khandwa's signature spice.",
    benefits: ["Stone-ground", "No artificial colour", "Sun-dried"],
    nutrition: [
      { label: "Energy", value: "282 kcal" },
      { label: "Vitamin C", value: "76 mg" }
    ],
    tags: ["spicy", "spice", "cooking"],
    bestseller: true,
    stock: 95,
    weight: "250g",
    origin: "Nimar Belt, MP"
  },
  {
    id: "p9",
    name: "Dry Fruit Chikki",
    category: "Sweets",
    price: 320,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80"],
    description: "A crunchy slab of jaggery layered with cashews, almonds and pistachios. Energy in every bite.",
    benefits: ["Loaded with nuts", "Natural energy", "No refined sugar"],
    nutrition: [
      { label: "Energy", value: "520 kcal" },
      { label: "Protein", value: "12 g" }
    ],
    tags: ["sweet", "energy", "nuts"],
    trending: true,
    stock: 42,
    weight: "300g",
    origin: "Khandwa, MP"
  },
  {
    id: "p10",
    name: "Heritage Spice Box",
    category: "Gifting",
    price: 999,
    rating: 4.9,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=80"],
    description: "A wooden masala-dani featuring 9 hand-blended Nimari spices. The perfect gift for a culinary enthusiast.",
    benefits: ["9 signature spices", "Wooden box", "Free recipe booklet"],
    nutrition: [{ label: "Pieces", value: "9 spices" }],
    tags: ["gift", "spice", "premium"],
    bestseller: true,
    stock: 18,
    weight: "900g",
    origin: "Khandwa, MP"
  },
  {
    id: "p11",
    name: "Roasted Makhana - Pudina",
    category: "Snacks",
    price: 150,
    rating: 4.5,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80"],
    description: "Crispy fox-nuts roasted in A2 ghee and tossed with mint and rock salt. Guilt-free crunch.",
    benefits: ["Low calorie", "Gluten-free", "High protein"],
    nutrition: [
      { label: "Energy", value: "347 kcal" },
      { label: "Protein", value: "9 g" }
    ],
    tags: ["healthy", "light", "tea-time"],
    stock: 70,
    weight: "100g",
    origin: "Khandwa, MP"
  },
  {
    id: "p12",
    name: "Stone-Ground Garam Masala",
    category: "Spices",
    price: 260,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=80"],
    description: "A warm, aromatic blend of 14 whole spices, sun-dried and stone-ground in small batches.",
    benefits: ["14-spice blend", "Small batch", "Boosts digestion"],
    nutrition: [{ label: "Energy", value: "379 kcal" }],
    tags: ["spice", "aromatic"],
    stock: 55,
    weight: "200g",
    origin: "Khandwa, MP"
  }
];

// Mongoose Product Schema Definition
const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  description: { type: String },
  benefits: [{ type: String }],
  nutrition: [{ label: String, value: String }],
  tags: [{ type: String }],
  bestseller: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  stock: { type: Number, required: true },
  weight: { type: String },
  origin: { type: String }
}, { timestamps: true });

let ProductModel;
try {
  ProductModel = mongoose.model("Product", productSchema);
} catch {
  ProductModel = mongoose.model("Product");
}

let dbMode = "json"; // 'mongodb' or 'json'

export async function initDb() {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 3000
      });
      dbMode = "mongodb";
      console.log("Successfully connected to MongoDB!");

      // Seed default products in MongoDB if database is empty
      const count = await ProductModel.countDocuments();
      if (count === 0) {
        console.log("Seeding default products into MongoDB...");
        await ProductModel.insertMany(DEFAULT_PRODUCTS);
        console.log("MongoDB seeded successfully.");
      }
    } catch (err) {
      console.error("MongoDB connection failed, falling back to local JSON database.", err.message);
      dbMode = "json";
      initJsonDb();
    }
  } else {
    console.log("No MONGODB_URI found, using local JSON database.");
    dbMode = "json";
    initJsonDb();
  }
}

function initJsonDb() {
  if (!fs.existsSync(JSON_DB_PATH)) {
    console.log("Initializing local JSON database...");
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(DEFAULT_PRODUCTS, null, 2));
    console.log("JSON database initialized with seeded products.");
  } else {
    // Validate file content
    try {
      const data = fs.readFileSync(JSON_DB_PATH, "utf-8");
      JSON.parse(data);
    } catch {
      console.log("JSON database corrupted, re-seeding...");
      fs.writeFileSync(JSON_DB_PATH, JSON.stringify(DEFAULT_PRODUCTS, null, 2));
    }
  }
}

// Helper: read products from JSON file
function readJsonProducts() {
  try {
    const data = fs.readFileSync(JSON_DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

// Helper: write products to JSON file
function writeJsonProducts(products) {
  fs.writeFileSync(JSON_DB_PATH, JSON.stringify(products, null, 2));
}

// --- DB Interfaces (Unified API) ---

export async function getProducts() {
  if (dbMode === "mongodb") {
    return await ProductModel.find({}).sort({ createdAt: -1 });
  } else {
    return readJsonProducts();
  }
}

export async function getProductById(id) {
  if (dbMode === "mongodb") {
    return await ProductModel.findOne({ id });
  } else {
    const products = readJsonProducts();
    return products.find(p => p.id === id) || null;
  }
}

export async function createProduct(productData) {
  if (dbMode === "mongodb") {
    const product = new ProductModel(productData);
    return await product.save();
  } else {
    const products = readJsonProducts();
    // Double check unique id
    if (products.some(p => p.id === productData.id)) {
      throw new Error(`Product with ID ${productData.id} already exists`);
    }
    products.unshift(productData);
    writeJsonProducts(products);
    return productData;
  }
}

export async function updateProduct(id, productData) {
  if (dbMode === "mongodb") {
    return await ProductModel.findOneAndUpdate({ id }, productData, { new: true });
  } else {
    const products = readJsonProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...productData };
    writeJsonProducts(products);
    return products[idx];
  }
}

export async function deleteProduct(id) {
  if (dbMode === "mongodb") {
    return await ProductModel.findOneAndDelete({ id });
  } else {
    const products = readJsonProducts();
    const filtered = products.filter(p => p.id !== id);
    if (products.length === filtered.length) return null;
    writeJsonProducts(filtered);
    return { id };
  }
}
