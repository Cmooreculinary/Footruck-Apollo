import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Truck, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/SEO";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const switchMode = (next) => {
    setMode(next);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body =
        mode === "login" ? { email, password } : { email, password, name };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Something went wrong");
      }

      await checkAuth();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] flex flex-col items-center justify-center px-4">
      <SEO
        title={
          mode === "login"
            ? "Sign In — Food Truck Launch Pad"
            : "Create Account — Food Truck Launch Pad"
        }
        description="Sign in or create your Food Truck Launch Pad account."
        url="/login"
      />

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 mb-10 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-[#E8592F] flex items-center justify-center">
          <Truck className="w-5 h-5 text-white" />
        </div>
        <span className="font-heading text-xl font-bold tracking-tight text-white">
          Food Truck Launch Pad
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-white/8 bg-white/[0.03] p-8">

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-white/[0.04] p-1 mb-8">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === "login"
                ? "bg-[#E8592F] text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === "register"
                ? "bg-[#E8592F] text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name — register only */}
          {mode === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                required
                autoComplete="name"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E8592F]/60 focus:bg-white/[0.06] transition-all"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E8592F]/60 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E8592F]/60 focus:bg-white/[0.06] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E8592F] text-white text-sm font-semibold hover:bg-[#d14a24] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {mode === "login" ? "Signing in…" : "Creating account…"}
              </>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>

      {/* Back link */}
      <Link
        to="/"
        className="mt-6 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
};

export default LoginPage;
