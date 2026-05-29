import { Navigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { state } = useStore();
  return state.user ? <>{children}</> : <Navigate to="/login" replace />;
}
