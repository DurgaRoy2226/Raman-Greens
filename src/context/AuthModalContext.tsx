"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type PendingAction = (() => void) | null;

type AuthModalCtxType = {
  isOpen: boolean;
  openModal: (onSuccess?: () => void) => void;
  closeModal: () => void;
  pendingAction: PendingAction;
  clearPending: () => void;
};

const AuthModalCtx = createContext<AuthModalCtxType | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const openModal = (onSuccess?: () => void) => {
    setPendingAction(() => onSuccess ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const clearPending = () => setPendingAction(null);

  return (
    <AuthModalCtx.Provider value={{ isOpen, openModal, closeModal, pendingAction, clearPending }}>
      {children}
    </AuthModalCtx.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalCtx);
  if (!ctx) throw new Error("useAuthModal must be inside AuthModalProvider");
  return ctx;
}
