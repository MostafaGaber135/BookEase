import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../utils/authToken";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    const role = (user?.role || user?.user?.role || "")?.toString().toLowerCase();

    if (!token || role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">You are logged in as admin.</p>
    </main>
  );
}
