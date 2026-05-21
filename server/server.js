import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import {
  initDb,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "./db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Setup directories
const UPLOADS_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(UPLOADS_DIR));

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `product-${uniqueSuffix}${ext}`);
  }
});

// Configure Multer Upload limits and validations
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const allowedExts = [".jpeg", ".jpg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image formats (.jpg, .jpeg, .png, .webp) are allowed!"), false);
    }
  }
});

// --- API ROUTES ---

// GET: All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products: " + err.message });
  }
});

// GET: Single Product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product: " + err.message });
  }
});

// POST: Create Product (Supports multipart/form-data for image uploads)
app.post("/api/products", upload.single("imageFile"), async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      description,
      oldPrice,
      weight,
      origin,
      benefits,
      nutrition,
      tags
    } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ error: "Missing required fields (name, price, stock)" });
    }

    // Resolve product image path
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imagePath = req.body.image; // Fallback to URL if pasted
    } else {
      imagePath = "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400"; // Default fallback
    }

    // Parse array/object fields from form data if sent as stringified JSON
    const parsedBenefits = typeof benefits === "string" ? JSON.parse(benefits) : (benefits || []);
    const parsedNutrition = typeof nutrition === "string" ? JSON.parse(nutrition) : (nutrition || []);
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : (tags || []);

    const newProduct = {
      id: req.body.id || `p${Date.now()}`,
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description: description || "",
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      weight: weight || "400g",
      origin: origin || "Nimar Belt, MP",
      image: imagePath,
      gallery: [imagePath],
      benefits: parsedBenefits,
      nutrition: parsedNutrition,
      tags: parsedTags,
      rating: 4.5, // Default rating for new items
      reviews: 0
    };

    const saved = await createProduct(newProduct);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product: " + err.message });
  }
});

// PUT: Update Product
app.put("/api/products/:id", upload.single("imageFile"), async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await getProductById(id);
    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    const {
      name,
      category,
      price,
      stock,
      description,
      oldPrice,
      weight,
      origin,
      benefits,
      nutrition,
      tags
    } = req.body;

    const updateData = { ...req.body };

    // Numerical conversions
    if (price !== undefined) updateData.price = Number(price);
    if (stock !== undefined) updateData.stock = Number(stock);
    if (oldPrice !== undefined) updateData.oldPrice = oldPrice !== "" ? Number(oldPrice) : undefined;

    // Resolve product image path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
      updateData.gallery = [updateData.image];
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    // Parse array/object fields
    if (typeof benefits === "string") updateData.benefits = JSON.parse(benefits);
    if (typeof nutrition === "string") updateData.nutrition = JSON.parse(nutrition);
    if (typeof tags === "string") updateData.tags = JSON.parse(tags);

    const updated = await updateProduct(id, updateData);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product: " + err.message });
  }
});

// DELETE: Delete Product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product: " + err.message });
  }
});

// --- ERROR HANDLING MIDDLEWARE ---
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "Image upload size exceeds the 5MB limit!" });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Initialize database connection and startup the server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database: ", err);
  process.exit(1);
});
