import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authAPI } from "../api/axios";

export default function AdminProtectedRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const verify = async () => {
      const key = localStorage.getItem("adminKey");
      if (!key) {
        setStatus("unauthorized");
        return;
      }

      try {
        await authAPI.verify();
        setStatus("authorized");
      } catch {
        localStorage.removeItem("adminKey");
        setStatus("unauthorized");
      }
    };

    verify();
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen bg-slate-950 p-6 text-sm text-slate-300">Checking admin session...</div>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
