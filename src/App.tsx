import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { StoreProvider } from "./context/StoreContext";
import { AuthModalProvider } from "./context/AuthModalContext";
import { AuthModal } from "./components/AuthModal";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AIChatbot } from "./components/AIChatbot";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Dashboard } from "./pages/Dashboard";
import { Wishlist } from "./pages/Wishlist";
import { Admin } from "./pages/Admin";
import { Snacks } from "./pages/Snacks";
import { Organics } from "./pages/Organics";
import { Gifting } from "./pages/Gifting";
import { Sweets } from "./pages/Sweets";
import { Spices } from "./pages/Spices";
import { About } from "./pages/About";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => { el.scrollIntoView({ behavior: "smooth" }); }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <AuthModalProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          {/* Global Auth Modal — lives outside routes so it persists */}
          <AuthModal />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop key="shop-all" />} />
              <Route path="/shop/:category" element={<Shop key="shop-category" />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/snacks" element={<Snacks key="shop-snacks" />} />
              <Route path="/organics" element={<Organics key="shop-organics" />} />
              <Route path="/gifting" element={<Gifting key="shop-gifting" />} />
              <Route path="/sweets" element={<Sweets key="shop-sweets" />} />
              <Route path="/spices" element={<Spices key="shop-spices" />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <AIChatbot />
        </BrowserRouter>
      </AuthModalProvider>
    </StoreProvider>
  );
}
