import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Phone, ArrowRight, AlertCircle, CheckCircle, ShieldCheck } from "lucide-react";
import { useStore } from "../context/StoreContext";

export function Login() {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Tab: "password" | "otp"
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [simulatedOtp, setSimulatedOtp] = useState("");

  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // Redirect path after login
  const from = (location.state as any)?.from?.pathname || "/";

  // Load Remember Me email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rg-remember-email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // OTP Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Helper: Retrieve registered users from localStorage (with fallback to default demo user)
  const getRegisteredUsers = () => {
    const defaultDemo = [
      { name: "Aarav Patil", email: "aarav@nimar.in", password: "password123", phone: "9876543210" }
    ];
    const stored = localStorage.getItem("rg-registered-users");
    if (!stored) {
      localStorage.setItem("rg-registered-users", JSON.stringify(defaultDemo));
      return defaultDemo;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return defaultDemo;
    }
  };

  const validatePasswordForm = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    if (!validatePasswordForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const users = getRegisteredUsers();
      const user = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        // Handle Remember Me
        if (rememberMe) {
          localStorage.setItem("rg-remember-email", email);
        } else {
          localStorage.removeItem("rg-remember-email");
        }

        dispatch({
          type: "LOGIN",
          user: { name: user.name, email: user.email, phone: user.phone },
        });

        setIsSubmitting(false);
        navigate(from, { replace: true });
      } else {
        setGeneralError("Invalid email or password. Please try again.");
        setIsSubmitting(false);
      }
    }, 1200);
  };

  // Simulated OTP Sending
  const handleSendOtp = (e: React.MouseEvent) => {
    e.preventDefault();
    setGeneralError("");
    if (!phone.trim()) {
      setFormErrors({ phone: "Phone number is required." });
      return;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      setFormErrors({ phone: "Please enter a valid 10-digit mobile number." });
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      // Generate simulated 6 digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedOtp(code);
      setOtpSent(true);
      setOtpCountdown(60);
      setIsSubmitting(false);
      // Alert the simulated code to the user for testing simplicity
      alert(`[Demo OTP] Your Raman Greens authentication code is: ${code}`);
    }, 1000);
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    if (!otp.trim()) {
      setFormErrors({ otp: "Verification code is required." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (otp === simulatedOtp || otp === "123456") {
        // Login success
        const users = getRegisteredUsers();
        // Try to match or create a temporary profile for OTP user
        let user = users.find((u: any) => u.phone === phone);
        if (!user) {
          user = { name: `User ${phone.slice(-4)}`, email: `${phone}@ramangreens.in`, phone };
        }

        dispatch({
          type: "LOGIN",
          user: { name: user.name, email: user.email, phone: user.phone },
        });

        setIsSubmitting(false);
        navigate(from, { replace: true });
      } else {
        setGeneralError("Invalid OTP code. Please try again or use default '123456'.");
        setIsSubmitting(false);
      }
    }, 1200);
  };

  // Mock Google Login
  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      dispatch({
        type: "LOGIN",
        user: { name: "Google User", email: "google.user@gmail.com", phone: "+91 99999 88888" },
      });
      setIsSubmitting(false);
      navigate(from, { replace: true });
    }, 1000);
  };

  // Forgot Password simulated submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail("");
      alert("A simulated password recovery link has been sent to your email address!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-nimar-gradient flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-beige-soft shadow-[0_20px_50px_rgba(12,59,27,0.08)] p-6 md:p-8 relative overflow-hidden">
        {/* Decorative branding elements */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-brand/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-emerald-brand/5 rounded-full blur-2xl pointer-events-none" />

        {/* Heading */}
        <div className="text-center mb-8">
          <span className="text-emerald-brand font-bold tracking-widest text-[10px] uppercase mb-1 block">
            Welcome to Raman Greens
          </span>
          <h2 className="text-3xl font-display font-bold text-neutral-900">
            Sign In Account
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Access your organic orders, wishlist & profile details.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-beige-warm/60 p-1 rounded-full mb-6">
          <button
            onClick={() => {
              setLoginMethod("password");
              setGeneralError("");
              setFormErrors({});
            }}
            className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
              loginMethod === "password"
                ? "bg-emerald-brand text-white shadow-sm"
                : "text-neutral-600 hover:text-emerald-brand"
            }`}
          >
            Password Login
          </button>
          <button
            onClick={() => {
              setLoginMethod("otp");
              setGeneralError("");
              setFormErrors({});
            }}
            className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
              loginMethod === "otp"
                ? "bg-emerald-brand text-white shadow-sm"
                : "text-neutral-600 hover:text-emerald-brand"
            }`}
          >
            OTP Login
          </button>
        </div>

        {/* Errors Alert */}
        {generalError && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {loginMethod === "password" ? (
            <motion.form
              key="password-form"
              onSubmit={handlePasswordLogin}
              className="space-y-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Email */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-650 mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-neutral-50/50 border pl-11 pr-4 py-3 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                      formErrors.email ? "border-red-355" : "border-beige-soft"
                    }`}
                  />
                </div>
                {formErrors.email && <p className="text-red-500 text-[10px] mt-1">{formErrors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-semibold text-neutral-650 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[10px] font-semibold text-emerald-brand hover:text-emerald-brand-dark hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-neutral-50/50 border pl-11 pr-11 py-3 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                      formErrors.password ? "border-red-355" : "border-beige-soft"
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
                {formErrors.password && <p className="text-red-500 text-[10px] mt-1">{formErrors.password}</p>}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-beige-soft text-emerald-brand focus:ring-emerald-brand accent-emerald-brand"
                />
                <label htmlFor="remember" className="ml-2 text-[11px] text-neutral-500 font-medium select-none cursor-pointer">
                  Remember email address
                </label>
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
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="otp-form"
              onSubmit={handleOtpLogin}
              className="space-y-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mobile Number */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-655 mb-1.5 block">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      disabled={otpSent}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className={`w-full bg-neutral-50/50 border pl-11 pr-4 py-3 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                        formErrors.phone ? "border-red-355" : "border-beige-soft"
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSubmitting || otpCountdown > 0}
                    className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-55 disabled:hover:bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-2xl transition duration-200 whitespace-nowrap cursor-pointer"
                  >
                    {otpCountdown > 0 ? `Resend (${otpCountdown}s)` : otpSent ? "Resend" : "Send OTP"}
                  </button>
                </div>
                {formErrors.phone && <p className="text-red-500 text-[10px] mt-1">{formErrors.phone}</p>}
              </div>

              {/* OTP Field (Conditionally Rendered) */}
              <AnimatePresence>
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-[11px] font-semibold text-neutral-655 mb-1.5 block">
                      Verification Code (OTP)
                    </label>
                    <div className="relative">
                      <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP code"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        className={`w-full bg-neutral-50/50 border pl-11 pr-4 py-3 rounded-2xl text-xs outline-none transition-shadow duration-300 shadow-sm focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand ${
                          formErrors.otp ? "border-red-355" : "border-beige-soft"
                        }`}
                      />
                    </div>
                    {formErrors.otp && <p className="text-red-500 text-[10px] mt-1">{formErrors.otp}</p>}
                    <p className="text-[10px] text-neutral-400 mt-1.5 leading-relaxed">
                      For testing: enter the code from the popup alert or use code <span className="font-bold text-neutral-650">123456</span>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit OTP */}
              <button
                type="submit"
                disabled={isSubmitting || !otpSent}
                className="w-full py-3 bg-emerald-brand hover:bg-emerald-brand-dark disabled:bg-emerald-brand/50 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Login</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Separator */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-100" />
          </div>
          <span className="relative px-3 bg-white text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            Or Connect With
          </span>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-350 text-neutral-700 text-xs font-bold rounded-xl transition duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
        >
          {/* Google G Logo */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.706 0 3.2.682 4.295 1.786l3.223-3.223C19.045 2.19 15.82 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.336 0 11.24-5.074 11.24-11.24 0-.744-.082-1.464-.227-2.155H12.24z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Toggle to Signup */}
        <div className="text-center mt-6 text-xs text-neutral-550">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-emerald-brand font-bold hover:text-emerald-brand-dark hover:underline"
          >
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotModal(false)}
              className="absolute inset-0 bg-[#0C1F15]/70 backdrop-blur-sm"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full relative border border-neutral-100 shadow-2xl z-10"
            >
              <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">
                Reset Password
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Enter your email address and we'll send you a simulated link to reset your password.
              </p>

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-beige-soft pl-11 pr-4 py-3 rounded-2xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-emerald-brand focus:border-emerald-brand"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotSent}
                    className="px-5 py-2.5 text-xs font-semibold bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-xl transition shadow-sm"
                  >
                    {forgotSent ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
