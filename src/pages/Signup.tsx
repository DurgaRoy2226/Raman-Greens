import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

export function Signup() {
  const navigate = useNavigate();

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Password strength helper
  const getPasswordStrength = (p: string) => {
    if (!p) return { label: "", color: "bg-neutral-200", width: "0%", level: 0 };
    let score = 0;
    if (p.length >= 6) score += 1;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;

    if (score <= 2) {
      return { label: "Weak", color: "bg-red-500", width: "33%", level: 1 };
    } else if (score <= 4) {
      return { label: "Medium", color: "bg-amber-500", width: "66%", level: 2 };
    } else {
      return { label: "Strong", color: "bg-emerald-650", width: "100%", level: 3 };
    }
  };

  const strength = getPasswordStrength(password);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Full name is required.";
    
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Retrieve existing users
      const defaultDemo = [
        { name: "Aarav Patil", email: "aarav@nimar.in", password: "password123", phone: "9876543210" }
      ];
      const stored = localStorage.getItem("rg-registered-users");
      let users = defaultDemo;
      if (stored) {
        try {
          users = JSON.parse(stored);
        } catch {}
      }

      // Check if user already exists
      const exists = users.some(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() || u.phone === phone
      );

      if (exists) {
        setFormErrors({ email: "An account with this email or phone number already exists." });
        setIsSubmitting(false);
        return;
      }

      // Add new user
      const newUser = { name, email, password, phone };
      users.push(newUser);
      localStorage.setItem("rg-registered-users", JSON.stringify(users));

      setIsSubmitting(false);
      setSubmitted(true);

      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-nimar-gradient flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-beige-soft shadow-[0_20px_50px_rgba(12,59,27,0.08)] p-6 md:p-8 relative overflow-hidden">
        {/* Decorative branding elements */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-brand/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-emerald-brand/5 rounded-full blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Heading */}
              <div className="text-center mb-6">
                <span className="text-emerald-brand font-bold tracking-widest text-[10px] uppercase mb-1 block">
                  Join Raman Greens
                </span>
                <h2 className="text-3xl font-display font-bold text-neutral-900">
                  Create Account
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Start your journey into premium organic delicacies.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 mb-1.5 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="e.g. प्रिया शर्मा"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-neutral-50/50 border pl-11 pr-4 py-2.5 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                        formErrors.name ? "border-red-400" : "border-beige-soft"
                      }`}
                    />
                  </div>
                  {formErrors.name && <p className="text-red-500 text-[10px] mt-1">{formErrors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email"
                      placeholder="priya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-neutral-50/50 border pl-11 pr-4 py-2.5 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                        formErrors.email ? "border-red-400" : "border-beige-soft"
                      }`}
                    />
                  </div>
                  {formErrors.email && <p className="text-red-500 text-[10px] mt-1">{formErrors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className={`w-full bg-neutral-50/50 border pl-11 pr-4 py-2.5 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                        formErrors.phone ? "border-red-400" : "border-beige-soft"
                      }`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-red-500 text-[10px] mt-1">{formErrors.phone}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-neutral-50/50 border pl-11 pr-11 py-2.5 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                        formErrors.password ? "border-red-400" : "border-beige-soft"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Strength Bar */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-neutral-500 mb-1">
                        <span>Password Strength:</span>
                        <span className={
                          strength.level === 1 ? "text-red-500" :
                          strength.level === 2 ? "text-amber-500" : "text-emerald-700"
                        }>
                          {strength.label}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: strength.width }}
                        />
                      </div>
                    </div>
                  )}

                  {formErrors.password && <p className="text-red-500 text-[10px] mt-1">{formErrors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 mb-1.5 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full bg-neutral-50/50 border pl-11 pr-11 py-2.5 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                        formErrors.confirmPassword ? "border-red-400" : "border-beige-soft"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && <p className="text-red-500 text-[10px] mt-1">{formErrors.confirmPassword}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:bg-emerald-brand/70 active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Toggle to Login */}
              <div className="text-center mt-6 text-xs text-neutral-550">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-emerald-brand font-bold hover:text-emerald-brand-dark hover:underline"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-emerald-brand/10 text-emerald-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={36} className="animate-bounce text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold font-display text-neutral-800 mb-2">Registered Successfully!</h3>
              <p className="text-neutral-500 text-xs max-w-xs mx-auto mb-6 leading-relaxed">
                Welcome to Raman Greens, {name}! Your organic lifestyle account is ready. Redirecting you to login in a moment...
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-brand hover:text-emerald-brand-dark hover:underline"
              >
                Go to Login Page now →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
