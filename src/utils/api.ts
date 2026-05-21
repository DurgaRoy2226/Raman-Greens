import { PRODUCTS, type Product } from "../data/products";

const API_BASE = "/api";

// Helper to get products from local fallback state
function getLocalFallbackProducts(): Product[] {
  const stored = localStorage.getItem("rg-local-products");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // ignore
    }
  }
  // Initialize local storage with default products if empty
  localStorage.setItem("rg-local-products", JSON.stringify(PRODUCTS));
  return PRODUCTS;
}

// Helper to save products to local fallback state
function saveLocalFallbackProducts(products: Product[]) {
  localStorage.setItem("rg-local-products", JSON.stringify(products));
}

/**
 * Fetch all products
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // Cache successfully fetched products in local storage for fallback
    saveLocalFallbackProducts(data);
    return data;
  } catch (err) {
    console.warn("Backend API not reachable or failed. Using resilient local storage fallback.", err);
    return getLocalFallbackProducts();
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch product ${id} from backend. Using local storage fallback.`, err);
    const products = getLocalFallbackProducts();
    return products.find(p => p.id === id) || null;
  }
}

/**
 * Create a new product (Multipart FormData)
 */
export async function addProduct(formData: FormData): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      body: formData // Fetch automatically sets headers for FormData
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to create product. Status: ${res.status}`);
    }

    const savedProduct = await res.json();
    
    // Update local cache too
    const local = getLocalFallbackProducts();
    local.unshift(savedProduct);
    saveLocalFallbackProducts(local);

    return savedProduct;
  } catch (err) {
    console.warn("Backend API write failed. Saving to local storage fallback instead.", err);
    
    // Parse form data to construct a temporary Product object for fallback
    const name = formData.get("name") as string;
    const category = formData.get("category") as Product["category"];
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = (formData.get("description") as string) || "";
    const oldPrice = formData.get("oldPrice") ? Number(formData.get("oldPrice")) : undefined;
    const weight = (formData.get("weight") as string) || "400g";
    const origin = (formData.get("origin") as string) || "Nimar Belt, MP";
    const imageFile = formData.get("imageFile") as File;
    
    let imageSrc = "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400";
    if (imageFile && imageFile.size > 0) {
      // In local fallback, we represent the image as a temporary object URL or a Base64 string
      // For instant UI rendering in fallback, we'll use Object URL (or a placeholder)
      imageSrc = URL.createObjectURL(imageFile);
    } else if (formData.get("image")) {
      imageSrc = formData.get("image") as string;
    }

    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name,
      category,
      price,
      stock,
      description,
      oldPrice,
      weight,
      origin,
      image: imageSrc,
      gallery: [imageSrc],
      benefits: [],
      nutrition: [],
      tags: [],
      rating: 4.5,
      reviews: 0
    };

    const localProducts = getLocalFallbackProducts();
    localProducts.unshift(newProduct);
    saveLocalFallbackProducts(localProducts);

    return newProduct;
  }
}

/**
 * Update an existing product (Multipart FormData)
 */
export async function updateProduct(id: string, formData: FormData): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      body: formData
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to update product. Status: ${res.status}`);
    }

    const updatedProduct = await res.json();
    
    // Update local cache
    const local = getLocalFallbackProducts();
    const idx = local.findIndex(p => p.id === id);
    if (idx !== -1) {
      local[idx] = updatedProduct;
      saveLocalFallbackProducts(local);
    }

    return updatedProduct;
  } catch (err) {
    console.warn(`Backend API update failed for ${id}. Modifying in local storage fallback.`, err);

    const local = getLocalFallbackProducts();
    const idx = local.findIndex(p => p.id === id);
    if (idx === -1) {
      throw new Error("Product not found in fallback cache.");
    }

    const name = formData.get("name") as string;
    const category = formData.get("category") as Product["category"];
    const price = formData.get("price") ? Number(formData.get("price")) : undefined;
    const stock = formData.get("stock") ? Number(formData.get("stock")) : undefined;
    const description = formData.get("description") as string;
    const oldPrice = formData.get("oldPrice") ? Number(formData.get("oldPrice")) : undefined;
    const weight = formData.get("weight") as string;
    const origin = formData.get("origin") as string;
    const imageFile = formData.get("imageFile") as File;

    const updated: Product = { ...local[idx] };
    if (name !== undefined) updated.name = name;
    if (category !== undefined) updated.category = category;
    if (price !== undefined) updated.price = price;
    if (stock !== undefined) updated.stock = stock;
    if (description !== undefined) updated.description = description;
    if (oldPrice !== undefined) updated.oldPrice = oldPrice;
    if (weight !== undefined) updated.weight = weight;
    if (origin !== undefined) updated.origin = origin;

    if (imageFile && imageFile.size > 0) {
      updated.image = URL.createObjectURL(imageFile);
      updated.gallery = [updated.image];
    } else if (formData.get("image")) {
      updated.image = formData.get("image") as string;
      updated.gallery = [updated.image];
    }

    local[idx] = updated;
    saveLocalFallbackProducts(local);

    return updated;
  }
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Update local cache
    const local = getLocalFallbackProducts();
    const filtered = local.filter(p => p.id !== id);
    saveLocalFallbackProducts(filtered);

    return true;
  } catch (err) {
    console.warn(`Backend API delete failed for ${id}. Deleting from local storage fallback.`, err);
    
    const local = getLocalFallbackProducts();
    const filtered = local.filter(p => p.id !== id);
    saveLocalFallbackProducts(filtered);
    
    return true;
  }
}
