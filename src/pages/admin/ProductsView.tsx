import { useState, useMemo, useEffect } from "react";
import { PRODUCTS, type Product } from "../../data/products";
import {
  Search, Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight,
  Star, SlidersHorizontal, X, Upload, Filter, AlertCircle
} from "lucide-react";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../../utils/api";

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
const PAGE_SIZE = 6;

type ModalProduct = {
  id: string; name: string; description: string; price: number | "";
  category: string; stock: number | ""; image: string; rating: number;
};

const EMPTY: ModalProduct = {
  id: "", name: "", description: "", price: "", category: "Snacks", stock: "", image: "", rating: 0,
};

export function ProductsView({ dm }: { dm: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [catFilter, setCat]   = useState("All");
  const [stockFilter, setStock] = useState("All");
  const [priceSort, setPriceSort] = useState<"none"|"asc"|"desc">("none");
  const [page, setPage]       = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Modal state
  const [modal, setModal]     = useState<null | "add" | "edit" | "view">(null);
  const [form, setForm]       = useState<ModalProduct>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load products from API
  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchProducts();
        if (active) setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  // ── Filtering & Sorting ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat    = catFilter === "All" || p.category === catFilter;
      const matchStock  = stockFilter === "All"
        || (stockFilter === "In Stock" && p.stock >= 25)
        || (stockFilter === "Low Stock" && p.stock > 0 && p.stock < 25)
        || (stockFilter === "Out of Stock" && p.stock === 0);
      return matchSearch && matchCat && matchStock;
    });
    if (priceSort === "asc")  list = [...list].sort((a,b) => a.price - b.price);
    if (priceSort === "desc") list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [products, search, catFilter, stockFilter, priceSort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const stockBadge = (stock: number) =>
    stock === 0     ? { label:"Out of Stock", cls:"bg-red-100 text-red-600"     }
    : stock < 25    ? { label:"Low Stock",    cls:"bg-amber-100 text-amber-700"  }
    :                 { label:"In Stock",     cls:"bg-emerald-100 text-emerald-700" };

  const openAdd  = () => {
    setForm(EMPTY);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    setModal("add");
  };
  const openEdit = (p: Product) => {
    setForm({ id:p.id, name:p.name, description:p.description, price:p.price,
              category:p.category, stock:p.stock, image:p.image, rating:p.rating });
    setSelectedFile(null);
    setPreviewUrl(p.image);
    setUploadError(null);
    setModal("edit");
  };
  const openView = (p: Product) => {
    setForm({ id:p.id, name:p.name, description:p.description, price:p.price,
              category:p.category, stock:p.stock, image:p.image, rating:p.rating });
    setModal("view");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (!file) return;

    // Validation: Accept only image formats (.jpg, .jpeg, .png, .webp)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const allowedExts = [".jpeg", ".jpg", ".png", ".webp"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!allowedTypes.includes(file.type) || !allowedExts.includes(ext)) {
      setUploadError("Only image formats (.jpg, .jpeg, .png, .webp) are allowed!");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Validation: Max size 5MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size exceeds the 5MB limit!");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const saveProduct = async () => {
    if (!form.name || form.price === "" || form.stock === "") return;
    
    setIsSaving(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      if (form.id) {
        formData.append("id", form.id);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", String(form.price));
      formData.append("stock", String(form.stock));
      formData.append("category", form.category);

      if (selectedFile) {
        formData.append("imageFile", selectedFile);
      } else if (form.image) {
        formData.append("image", form.image);
      }

      let saved: Product;
      if (modal === "edit") {
        saved = await updateProduct(form.id, formData);
        setProducts(prev => prev.map(p => p.id === saved.id ? saved : p));
      } else {
        saved = await addProduct(formData);
        setProducts(prev => [saved, ...prev]);
      }
      setModal(null);
    } catch (err: any) {
      console.error("Error saving product", err);
      setUploadError(err.message || "Failed to save product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct(deleteId);
      setProducts(prev => prev.filter(p => p.id !== deleteId));
    } catch (err) {
      console.error("Error deleting product", err);
    } finally {
      setDeleteId(null);
    }
  };

  // ── Styles ───────────────────────────────────────────────────────────────
  const card   = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text   = dm ? "text-white" : "text-gray-900";
  const sub    = dm ? "text-gray-400" : "text-gray-500";
  const inp    = dm ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400";
  const tHead  = dm ? "text-gray-400 border-gray-700 bg-gray-900" : "text-gray-500 border-gray-100 bg-gray-50";
  const tRow   = dm ? "border-gray-700 hover:bg-gray-750" : "border-gray-100 hover:bg-gray-50";

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${text}`}>Product Management</h1>
          <p className={`text-sm mt-0.5 ${sub}`}>{products.length} total products · {filtered.length} shown</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-emerald-200">
          <Plus size={16}/> Add New Product
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className={`${card} border rounded-2xl p-4 shadow-sm mb-5`}>
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className={`flex items-center gap-2 flex-1 min-w-[180px] px-3 py-2.5 rounded-xl border ${inp}`}>
            <Search size={15} className={sub}/>
            <input value={search} onChange={e=>{ setSearch(e.target.value); setPage(1); }}
              placeholder="Search products..." className="bg-transparent outline-none text-sm flex-1"/>
          </div>

          {/* Category */}
          <select value={catFilter} onChange={e=>{ setCat(e.target.value); setPage(1); }}
            className={`px-3 py-2.5 rounded-xl border text-sm font-medium outline-none cursor-pointer ${inp}`}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Stock Status */}
          <select value={stockFilter} onChange={e=>{ setStock(e.target.value); setPage(1); }}
            className={`px-3 py-2.5 rounded-xl border text-sm font-medium outline-none cursor-pointer ${inp}`}>
            {["All","In Stock","Low Stock","Out of Stock"].map(s=><option key={s}>{s}</option>)}
          </select>

          {/* Price Sort */}
          <select value={priceSort} onChange={e=>setPriceSort(e.target.value as "none"|"asc"|"desc")}
            className={`px-3 py-2.5 rounded-xl border text-sm font-medium outline-none cursor-pointer ${inp}`}>
            <option value="none">Price: Default</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>

          <button onClick={()=>{ setSearch(""); setCat("All"); setStock("All"); setPriceSort("none"); setPage(1); }}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition
              ${dm?"border-gray-600 text-gray-300 hover:bg-gray-700":"border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
            <Filter size={14}/> Reset
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className={`${card} border rounded-2xl shadow-sm overflow-hidden mb-4`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left text-xs font-semibold uppercase tracking-wider border-b ${tHead}`}>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Stock</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Rating</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className={`text-center py-16 ${sub}`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-semibold text-sm">Loading products...</p>
                  </div>
                </td></tr>
              ) : pageData.length === 0 ? (
                <tr><td colSpan={7} className={`text-center py-16 ${sub}`}>
                  <div className="flex flex-col items-center gap-2">
                    <SlidersHorizontal size={32} className="opacity-30"/>
                    <p>No products match your filters.</p>
                  </div>
                </td></tr>
              ) : pageData.map(p => {
                const badge = stockBadge(p.stock);
                return (
                  <tr key={p.id} className={`border-b last:border-0 transition-colors ${tRow} group`}>
                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
                        </div>
                        <div className="min-w-0">
                          <p className={`font-semibold text-sm truncate max-w-[160px] ${text}`}>{p.name}</p>
                          <p className={`text-xs truncate max-w-[160px] ${sub}`}>{p.weight}</p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${dm?"bg-gray-700 text-gray-300":"bg-gray-100 text-gray-600"}`}>
                        {p.category}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-5 py-4">
                      <span className={`font-bold ${text}`}>₹{p.price}</span>
                    </td>
                    {/* Stock */}
                    <td className="px-5 py-4">
                      <span className={`font-semibold text-sm ${p.stock < 25 ? "text-red-500" : "text-emerald-600"}`}>{p.stock}</span>
                    </td>
                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
                    </td>
                    {/* Rating */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={13} className="text-amber-400 fill-amber-400"/>
                        <span className={`text-xs font-semibold ${text}`}>{p.rating}</span>
                        <span className={`text-xs ${sub}`}>({p.reviews})</span>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={()=>openView(p)}
                          className={`p-2 rounded-lg transition ${dm?"hover:bg-gray-700 text-gray-400 hover:text-blue-400":"hover:bg-blue-50 text-gray-400 hover:text-blue-600"}`}
                          title="View">
                          <Eye size={15}/>
                        </button>
                        <button onClick={()=>openEdit(p)}
                          className={`p-2 rounded-lg transition ${dm?"hover:bg-gray-700 text-gray-400 hover:text-emerald-400":"hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"}`}
                          title="Edit">
                          <Edit size={15}/>
                        </button>
                        <button onClick={()=>setDeleteId(p.id)}
                          className={`p-2 rounded-lg transition ${dm?"hover:bg-gray-700 text-gray-400 hover:text-red-400":"hover:bg-red-50 text-gray-400 hover:text-red-500"}`}
                          title="Delete">
                          <Trash2 size={15}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`text-sm ${sub}`}>
          Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length} products
        </p>
        <div className="flex items-center gap-1">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
            className={`p-2 rounded-lg transition disabled:opacity-40 ${dm?"hover:bg-gray-700":"hover:bg-gray-100"}`}>
            <ChevronLeft size={16}/>
          </button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
            <button key={n} onClick={()=>setPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold transition
                ${page===n?"bg-emerald-500 text-white shadow-sm":""+dm?"hover:bg-gray-700 text-gray-300":"hover:bg-gray-100 text-gray-700"}`}>
              {n}
            </button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
            className={`p-2 rounded-lg transition disabled:opacity-40 ${dm?"hover:bg-gray-700":"hover:bg-gray-100"}`}>
            <ChevronRight size={16}/>
          </button>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {(modal==="add"||modal==="edit") && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={()=>setModal(null)}>
          <div className={`${dm?"bg-gray-800 border-gray-700":"bg-white border-gray-100"} border rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl`}
            onClick={e=>e.stopPropagation()}>
            <div className={`flex items-center justify-between px-6 py-5 border-b ${dm?"border-gray-700":"border-gray-100"}`}>
              <h2 className={`text-lg font-bold ${text}`}>{modal==="add"?"Add New Product":"Edit Product"}</h2>
              <button onClick={()=>setModal(null)} className={`p-2 rounded-xl ${dm?"hover:bg-gray-700":"hover:bg-gray-100"} transition`}><X size={18}/></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image Upload Area */}
              <div>
                <label className={`text-xs font-semibold ${sub} mb-1.5 block`}>Product Image *</label>
                
                {/* Visual selector / preview box */}
                <div 
                  onClick={() => document.getElementById("device-image-input")?.click()}
                  className={`group relative w-full h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                    ${uploadError ? "border-red-400 bg-red-50/10" : dm ? "border-gray-600 bg-gray-750 hover:border-emerald-500" : "border-gray-200 bg-gray-50 hover:border-emerald-500"} overflow-hidden`}>
                  
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                        <p className="text-white text-xs font-semibold flex items-center gap-1.5 bg-black/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                          <Upload size={14}/> Change Image
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center p-4 text-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors
                        ${dm ? "bg-gray-700 text-emerald-400 group-hover:bg-gray-650" : "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100"}`}>
                        <Upload size={20}/>
                      </div>
                      <p className={`text-xs font-bold ${text}`}>Upload an image from device</p>
                      <p className={`text-[10px] mt-1 ${sub}`}>Accepts PNG, JPG, JPEG, WEBP · Max 5MB</p>
                    </div>
                  )}
                </div>
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  id="device-image-input" 
                  accept="image/png, image/jpeg, image/jpg, image/webp" 
                  onChange={handleFileChange} 
                  className="hidden"
                />
              </div>

              {/* URL Input (Optional alternative) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`text-xs font-semibold ${sub}`}>Or Paste Image URL</label>
                  {previewUrl && (
                    <button 
                      type="button" 
                      onClick={() => { setSelectedFile(null); setPreviewUrl(null); setForm({...form, image: ""}); }}
                      className="text-[10px] font-bold text-red-500 hover:text-red-600 transition">
                      Clear Image
                    </button>
                  )}
                </div>
                <input 
                  type="text"
                  value={selectedFile ? "" : form.image} 
                  disabled={!!selectedFile}
                  onChange={e => {
                    setForm({...form, image: e.target.value});
                    setPreviewUrl(e.target.value || null);
                    setUploadError(null);
                  }}
                  placeholder={selectedFile ? "Using file uploaded from device..." : "https://example.com/image.jpg"} 
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-emerald-400/40 
                    ${selectedFile ? "opacity-50 cursor-not-allowed bg-gray-150" : inp}`}
                />
              </div>

              {/* Validation/Upload Errors */}
              {uploadError && (
                <div className="flex items-start gap-2 p-3.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-medium">
                  <AlertCircle size={15} className="shrink-0 mt-0.5"/>
                  <span>{uploadError}</span>
                </div>
              )}

              <div>
                <label className={`text-xs font-semibold ${sub} mb-1.5 block`}>Product Name *</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  placeholder="e.g. Fresh Tomatoes" className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-400/40 ${inp}`}/>
              </div>
              <div>
                <label className={`text-xs font-semibold ${sub} mb-1.5 block`}>Description</label>
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}
                  placeholder="Product description..." rows={3}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none focus:ring-2 focus:ring-emerald-400/40 ${inp}`}/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-semibold ${sub} mb-1.5 block`}>Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value===""?"":Number(e.target.value)})}
                    placeholder="0" className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-400/40 ${inp}`}/>
                </div>
                <div>
                  <label className={`text-xs font-semibold ${sub} mb-1.5 block`}>Stock Qty *</label>
                  <input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value===""?"":Number(e.target.value)})}
                    placeholder="0" className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-400/40 ${inp}`}/>
                </div>
              </div>
              <div>
                <label className={`text-xs font-semibold ${sub} mb-1.5 block`}>Category</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-400/40 ${inp}`}>
                  {["Snacks","Organics","Sweets","Spices","Gifting"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className={`flex gap-3 px-6 py-4 border-t ${dm?"border-gray-700":"border-gray-100"}`}>
              <button onClick={()=>setModal(null)} disabled={isSaving}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition disabled:opacity-50 ${dm?"border-gray-600 text-gray-300 hover:bg-gray-700":"border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                Cancel
              </button>
              <button onClick={saveProduct} disabled={isSaving}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/70 text-white text-sm font-semibold transition shadow-sm flex items-center justify-center gap-2">
                {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                {isSaving ? "Saving..." : modal==="add"?"Add Product":"Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Modal ── */}
      {modal==="view" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={()=>setModal(null)}>
          <div className={`${dm?"bg-gray-800 border-gray-700":"bg-white border-gray-100"} border rounded-3xl w-full max-w-md shadow-2xl`}
            onClick={e=>e.stopPropagation()}>
            <div className={`flex items-center justify-between px-6 py-5 border-b ${dm?"border-gray-700":"border-gray-100"}`}>
              <h2 className={`text-lg font-bold ${text}`}>Product Details</h2>
              <button onClick={()=>setModal(null)} className={`p-2 rounded-xl ${dm?"hover:bg-gray-700":"hover:bg-gray-100"} transition`}><X size={18}/></button>
            </div>
            <div className="p-6">
              {form.image && <img src={form.image} alt={form.name} className="w-full h-48 object-cover rounded-2xl mb-5"/>}
              <h3 className={`text-xl font-bold ${text} mb-1`}>{form.name}</h3>
              <p className={`text-sm ${sub} mb-4`}>{form.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {label:"Price", value:`₹${form.price}`},
                  {label:"Stock", value:String(form.stock)},
                  {label:"Category", value:form.category},
                  {label:"Rating", value:`${form.rating} ★`},
                ].map(row=>(
                  <div key={row.label} className={`p-3 rounded-xl ${dm?"bg-gray-700":"bg-gray-50"}`}>
                    <p className={`text-xs ${sub}`}>{row.label}</p>
                    <p className={`font-bold text-sm mt-0.5 ${text}`}>{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={()=>setDeleteId(null)}>
          <div className={`${dm?"bg-gray-800 border-gray-700":"bg-white border-gray-100"} border rounded-3xl w-full max-w-sm p-6 shadow-2xl`}
            onClick={e=>e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><Trash2 size={22}/></div>
            <h3 className={`text-lg font-bold text-center ${text} mb-1`}>Delete Product?</h3>
            <p className={`text-sm text-center ${sub} mb-5`}>This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={()=>setDeleteId(null)}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold ${dm?"border-gray-600 text-gray-300 hover:bg-gray-700":"border-gray-200 text-gray-600 hover:bg-gray-50"} transition`}>
                Cancel
              </button>
              <button onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
