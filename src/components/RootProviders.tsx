"use client";

import { type ReactNode } from "react";
import { StoreProvider } from "../context/StoreContext";
import { AuthModalProvider } from "../context/AuthModalContext";
import { AuthModal } from "./AuthModal";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AIChatbot } from "./AIChatbot";
import { ScrollToTop } from "./ScrollToTop";

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <AuthModalProvider>
        <ScrollToTop />
        <Navbar />
        <AuthModal />
        <main>{children}</main>
        <Footer />
        <AIChatbot />
      </AuthModalProvider>
    </StoreProvider>
  );
}
