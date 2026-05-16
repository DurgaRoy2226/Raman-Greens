import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle2, Leaf } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { useAuthModal } from "../context/AuthModalContext";

type Mode = "login" | "signup" | "forgot";

function validate(mode: Mode, data: Record<string, string>) {
  const e: Record<string, string> = {};
  if (!data.email) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email";
  if (mode !== "forgot") {
    if (!data.password) e.password = "Password is required";
    else if (data.password.length < 6) e.password = "Min. 6 characters";
  }
  if (mode === "signup") {
    if (!data.name.trim()) e.name = "Full name is required";
    if (data.password && data.confirm && data.password !== data.confirm)
      e.confirm = "Passwords do not match";
  }
  return e;
}

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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-[11px] text-red-500 font-semibold mt-1.5">
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full px-4 py-3 rounded-2xl border text-sm transition-all duration-200 outline-none focus:ring-4 ${
    err ? "border-red-400 bg-red-50 focus:ring-red-500/10" : "border-beige-soft bg-beige-warm/60 focus:ring-emerald-brand/10 focus:border-emerald-brand"
  }`;

export function AuthPage({ onSuccess }: { onSuccess?: () => void }) {
  const { dispatch } = useStore();
  const { pendingAction, clearPending } = useAuthModal();
  const [mode, setMode] = useState<Mode>("login");
  const [fields, setFields] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }));
  const reset = () => { setFields({ name: "", email: "", password: "", confirm: "" }); setErrors({}); setDone(false); setLoading(false); };
  const switchMode = (m: Mode) => { setMode(m); reset(); };

  const finish = (name: string, email: string) => {
    dispatch({ type: "LOGIN", user: { name, email } });
    setDone(true);
    setTimeout(() => {
      if (pendingAction) { pendingAction(); clearPending(); }
      onSuccess?.();
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(mode, fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    if (mode === "forgot") { setDone(true); return; }
    const name = mode === "signup" ? fields.name : fields.email.split("@")[0];
    finish(name, fields.email);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    finish("Google User", "google@ramangreens.com");
  };

  return (
    <div className="min-h-screen bg-nimar-gradient flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Brand tag */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-emerald-brand font-bold text-xs uppercase tracking-widest mb-8">
          <Leaf size={14} /> Raman Greens KNW
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/10 overflow-hidden">
          {/* Green top bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-brand to-emerald-brand-dark" />

          {/* Tab switcher (login / signup) */}
          {mode !== "forgot" && (
            <div className="flex border-b border-beige-soft">
              {(["login", "signup"] as Mode[]).map((m) => (
                <button key={m} onClick={() => switchMode(m)}
                  className={`flex-1 py-4 text-sm font-bold transition-all duration-300 ${
                    mode === m ? "text-emerald-brand border-b-2 border-emerald-brand bg-emerald-brand/3" : "text-neutral-400 hover:text-neutral-700"
                  }`}>
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          <div className="p-8 sm:p-10">
            {/* Success */}
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-brand/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={40} className="text-emerald-brand" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">
                    {mode === "forgot" ? "Reset link sent!" : "Welcome!"}
                  </h2>
                  <p className="text-neutral-500 text-sm">
                    {mode === "forgot" ? "Check your inbox for the reset link." : "Taking you to your account…"}
                  </p>
                </motion.div>
              ) : (
                <motion.div key={mode} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <h2 className="font-display font-bold text-2xl text-neutral-900 mb-1">
                    {mode === "login" && "Welcome back"}
                    {mode === "signup" && "Join Raman Greens"}
                    {mode === "forgot" && "Forgot password?"}
                  </h2>
                  <p className="text-sm text-neutral-500 mb-8">
                    {mode === "login" && "Sign in to your account to continue"}
                    {mode === "signup" && "Join 12,000+ Nimari families"}
                    {mode === "forgot" && "Enter your email to receive a reset link"}
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name — signup only */}
                    {mode === "signup" && (
                      <Field label="Full Name" error={errors.name}>
                        <div className="relative">
                          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input type="text" placeholder="Aarav Patil" value={fields.name}
                            onChange={(e) => set("name", e.target.value)}
                            className={`${inputCls(errors.name)} pl-10`} />
                        </div>
                      </Field>
                    )}

                    {/* Email */}
                    <Field label="Email Address" error={errors.email}>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input type="email" placeholder="you@example.com" value={fields.email}
                          onChange={(e) => set("email", e.target.value)}
                          className={`${inputCls(errors.email)} pl-10`} autoComplete="email" />
                      </div>
                    </Field>

                    {/* Password */}
                    {mode !== "forgot" && (
                      <Field label="Password" error={errors.password}>
                        <div className="relative">
                          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input type={showPw ? "text" : "password"} placeholder="Min. 6 characters"
                            value={fields.password} onChange={(e) => set("password", e.target.value)}
                            className={`${inputCls(errors.password)} pl-10 pr-11`}
                            autoComplete={mode === "login" ? "current-password" : "new-password"} />
                          <button type="button" onClick={() => setShowPw((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors">
                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </Field>
                    )}

                    {/* Confirm password — signup only */}
                    {mode === "signup" && (
                      <Field label="Confirm Password" error={errors.confirm}>
                        <div className="relative">
                          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input type={showCf ? "text" : "password"} placeholder="Repeat password"
                            value={fields.confirm} onChange={(e) => set("confirm", e.target.value)}
                            className={`${inputCls(errors.confirm)} pl-10 pr-11`} autoComplete="new-password" />
                          <button type="button" onClick={() => setShowCf((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors">
                            {showCf ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </Field>
                    )}

                    {mode === "login" && (
                      <div className="text-right -mt-2">
                        <button type="button" onClick={() => switchMode("forgot")}
                          className="text-xs text-emerald-brand font-semibold hover:underline">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <button type="submit" disabled={loading}
                      className="w-full bg-emerald-brand text-white py-3.5 rounded-2xl font-bold hover:bg-emerald-brand-dark transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-brand/25 disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2">
                      {loading
                        ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
                    </button>

                    {mode !== "forgot" && (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-px bg-beige-soft" />
                          <span className="text-xs text-neutral-400 font-semibold">or continue with</span>
                          <div className="flex-1 h-px bg-beige-soft" />
                        </div>
                        <button type="button" onClick={handleGoogle} disabled={loading}
                          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border-2 border-beige-soft hover:border-neutral-300 bg-white hover:bg-beige-warm transition-all duration-200 font-semibold text-sm text-neutral-700 disabled:opacity-60">
                          <GoogleIcon /> Continue with Google
                        </button>
                      </>
                    )}

                    {mode === "forgot" && (
                      <button type="button" onClick={() => switchMode("login")}
                        className="w-full text-center text-sm text-emerald-brand font-bold hover:underline">
                        ← Back to Sign In
                      </button>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-8 text-xs text-neutral-400">
          <span>🔒 SSL Secured</span>
          <span>🌿 12,000+ Members</span>
          <span>⭐ 4.9 Rated</span>
        </motion.div>
      </div>
    </div>
  );
}
