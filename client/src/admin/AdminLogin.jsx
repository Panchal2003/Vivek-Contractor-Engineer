import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, setAdminKey } from "../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [adminKey, setAdminKeyState] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authAPI.login(adminKey.trim());
      setAdminKey(adminKey.trim());
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/85 p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-400">Enter your admin secret key to access protected admin pages.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-key" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
              Admin Secret Key
            </label>
            <input
              id="admin-key"
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKeyState(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
            />
          </div>

          {error ? <p className="rounded-lg border border-rose-300/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p> : null}

          <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-70">
            {isLoading ? "Checking..." : "Login"}
          </button>
        </form>

        <Link to="/" className="mt-4 inline-block text-sm text-cyan-200 hover:text-cyan-100">
          Back to Website
        </Link>
      </div>
    </div>
  );
}
