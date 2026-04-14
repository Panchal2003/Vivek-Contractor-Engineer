import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, setAdminKey } from "../api/axios";
import { Shield, Eye, EyeOff, Loader2, ArrowRight, Building2 } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [adminKey, setAdminKeyState] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className={`w-full max-w-md relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/25">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">Vivek Contractors</h1>
            <p className="text-sm text-slate-500 mt-1">Admin Control Panel</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Secure Access</p>
                <p className="text-xs text-slate-500 mt-0.5">Enter your admin secret key to access the protected admin dashboard.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-key" className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                Admin Secret Key
              </label>
              <div className="relative">
                <input
                  id="admin-key"
                  type={showPassword ? "text" : "password"}
                  value={adminKey}
                  onChange={(event) => setAdminKeyState(event.target.value)}
                  required
                  placeholder="Enter your secret key"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                <p className="text-sm text-rose-600 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
              <ArrowRight className="w-4 h-4 -rotate-90" />
              Back to Website
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Protected admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
