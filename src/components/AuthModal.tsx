"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Eye, EyeOff, Leaf, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthModal } from "../context/AuthModalContext";
import { useStore } from "../context/StoreContext";

type Mode = "login" | "signup" | "forgot";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function validate(mode: Mode, email: string, password: string, name: string) {
  const errs: Record<string, string> = {};
  if (!email) errs.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
  if (mode !== "forgot") {
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
  }
  if (mode === "signup" && !name.trim()) errs.name = "Full name is required";
  return errs;
}

export function AuthModal() {
  const { isOpen, closeModal, pendingAction, clearPending } = useAuthModal();
  const { dispatch } = useStore();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setName(""); setEmail(""); setPassword("");
    setErrors({}); setLoading(false); setSuccess(false); setShowPw(false);
  };

  const switchMode = (m: Mode) => { setMode(m); reset(); };

  const handleClose = () => { closeModal(); reset(); setMode("login"); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(mode, email, password, name);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    // Simulate async auth (replace with real API call)
    await new Promise((r) => setTimeout(r, 900));

    if (mode === "forgot") {
      setLoading(false);
      setSuccess(true);
      return;
    }

    const userName = mode === "signup" ? name : email.split("@")[0];
    dispatch({ type: "LOGIN", user: { name: userName, email } });
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      if (pendingAction) { pendingAction(); clearPending(); }
      handleClose();
    }, 800);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    dispatch({ type: "LOGIN", user: { name: "Google User", email: "google@ramangreens.com" } });
    setLoading(false);
    if (pendingAction) { pendingAction(); clearPending(); }
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/20 w-full max-w-md pointer-events-auto overflow-hidden">

              {/* Green top stripe */}
              <div className="bg-gradient-to-r from-emerald-brand to-emerald-brand-dark h-1.5" />

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-brand font-bold text-xs uppercase tracking-widest mb-2">
                      <Leaf size={13} /> Raman Greens KNW
                    </div>
                    <h2 className="font-display font-bold text-2xl text-neutral-900">
                      {mode === "login" && "Welcome back"}
                      {mode === "signup" && "Create account"}
                      {mode === "forgot" && "Reset password"}
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      {mode === "login" && "Sign in to continue shopping"}
                      {mode === "signup" && "Join 12,000+ Nimari families"}
                      {mode === "forgot" && "We'll send you a reset link"}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-xl hover:bg-beige-warm text-neutral-400 hover:text-neutral-700 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Success state */}
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-emerald-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-emerald-brand" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">
                        {mode === "forgot" ? "Email sent!" : "You're in!"}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {mode === "forgot"
                          ? "Check your inbox for the reset link."
                          : "Continuing where you left off…"}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      {/* Name (signup only) */}
                      <AnimatePresence>
                        {mode === "signup" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <FieldWrapper label="Full Name" error={errors.name}>
                              <input
                                type="text"
                                placeholder="Aarav Patil"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputCls(!!errors.name)}
                              />
                            </FieldWrapper>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Email */}
                      <FieldWrapper label="Email Address" error={errors.email} icon={<Mail size={16} />}>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputCls(!!errors.email)}
                          autoComplete="email"
                        />
                      </FieldWrapper>

                      {/* Password */}
                      <AnimatePresence>
                        {mode !== "forgot" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <FieldWrapper label="Password" error={errors.password} icon={<Lock size={16} />}>
                              <div className="relative">
                                <input
                                  type={showPw ? "text" : "password"}
                                  placeholder="Min. 6 characters"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className={`${inputCls(!!errors.password)} pr-12`}
                                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPw((v) => !v)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                                >
                                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                            </FieldWrapper>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Forgot password link */}
                      {mode === "login" && (
                        <div className="text-right">
                          <button
                            type="button"
                            onClick={() => switchMode("forgot")}
                            className="text-xs text-emerald-brand font-semibold hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-brand text-white py-3.5 rounded-2xl font-bold hover:bg-emerald-brand-dark transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-brand/25 disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2 mt-2"
                      >
                        {loading ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            {mode === "login" && "Sign In"}
                            {mode === "signup" && "Create Account"}
                            {mode === "forgot" && "Send Reset Link"}
                          </>
                        )}
                      </button>

                      {/* Divider + Google */}
                      {mode !== "forgot" && (
                        <>
                          <div className="flex items-center gap-3 my-2">
                            <div className="flex-1 h-px bg-beige-soft" />
                            <span className="text-xs text-neutral-400 font-semibold">or</span>
                            <div className="flex-1 h-px bg-beige-soft" />
                          </div>

                          <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border-2 border-beige-soft hover:border-neutral-300 bg-white hover:bg-beige-warm transition-all duration-200 font-semibold text-sm text-neutral-700 disabled:opacity-60"
                          >
                            <GoogleIcon />
                            Continue with Google
                          </button>
                        </>
                      )}

                      {/* Mode switch */}
                      <p className="text-center text-sm text-neutral-500 pt-2">
                        {mode === "login" ? (
                          <>
                            New to Raman Greens?{" "}
                            <button type="button" onClick={() => switchMode("signup")} className="text-emerald-brand font-bold hover:underline">
                              Sign Up
                            </button>
                          </>
                        ) : mode === "signup" ? (
                          <>
                            Already have an account?{" "}
                            <button type="button" onClick={() => switchMode("login")} className="text-emerald-brand font-bold hover:underline">
                              Sign In
                            </button>
                          </>
                        ) : (
                          <>
                            Remember it?{" "}
                            <button type="button" onClick={() => switchMode("login")} className="text-emerald-brand font-bold hover:underline">
                              Back to login
                            </button>
                          </>
                        )}
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

function FieldWrapper({
  label, error, icon, children,
}: {
  label: string; error?: string; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            {icon}
          </span>
        )}
        <div className={icon ? "[&_input]:pl-10" : ""}>{children}</div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-[11px] text-red-500 font-semibold mt-1.5"
          >
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 rounded-2xl border text-sm transition-all duration-200 outline-none focus:ring-4 ${
    hasError
      ? "border-red-400 bg-red-50 focus:ring-red-500/10 focus:border-red-400"
      : "border-beige-soft bg-beige-warm/50 focus:ring-emerald-brand/10 focus:border-emerald-brand"
  }`;
}
