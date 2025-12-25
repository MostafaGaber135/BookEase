import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { getToken, getUser } from "../../utils/authToken";

import StatCard from "./components/StatCard";
import SegmentedTabs from "./components/SegmentedTabs";
import BookingsPanel from "./components/BookingsPanel";
import ServicesPanel from "./components/ServicesPanel";

function sumRevenue(bookings) {
  return (Array.isArray(bookings) ? bookings : [])
    .filter((b) => b.status !== "cancelled")
    .reduce((acc, b) => acc + (Number(b.servicePrice) || 0), 0);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    const role = (user?.role || user?.user?.role || "")?.toString().toLowerCase();

    if (!token || role !== "admin") {
      navigate("/", { replace: true });
      return;
    }

    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [bRes, sRes] = await Promise.all([
          api.get("/bookings"),
          api.get("/services"),
        ]);

        if (!alive) return;
        setBookings(bRes?.data?.bookings || []);
        setServices(sRes?.data?.services || []);
      } catch (e) {
        if (!alive) return;
        const msg =
          e?.response?.data?.message || e?.message || "Failed to load dashboard data";
        setError(msg);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [navigate]);

  const stats = useMemo(() => {
    const list = Array.isArray(bookings) ? bookings : [];
    const totalBookings = list.length;
    const pending = list.filter((b) => b.status === "pending").length;
    const confirmed = list.filter((b) => b.status === "confirmed").length;
    const revenue = sumRevenue(list);

    return { totalBookings, pending, confirmed, revenue };
  }, [bookings]);

  const refreshBookings = async () => {
    const bRes = await api.get("/bookings");
    setBookings(bRes?.data?.bookings || []);
  };

  const refreshServices = async () => {
    const sRes = await api.get("/services");
    setServices(sRes?.data?.services || []);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your services, bookings, and view analytics.</p>
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value={stats.totalBookings} icon="calendar" />
        <StatCard title="Pending" value={stats.pending} icon="pending" />
        <StatCard title="Confirmed" value={stats.confirmed} icon="confirmed" />
        <StatCard title="Revenue" value={`$${stats.revenue}`} icon="revenue" />
      </div>

      <div className="mt-6">
        <SegmentedTabs
          value={activeTab}
          onChange={setActiveTab}
          tabs={[
            { value: "bookings", label: "Bookings" },
            { value: "services", label: "Services" },
          ]}
        />
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          {error}
        </div>
      ) : null}

      <div className="mt-5">
        {activeTab === "bookings" ? (
          <BookingsPanel loading={loading} bookings={bookings} onRefresh={refreshBookings} />
        ) : (
          <ServicesPanel loading={loading} services={services} onRefresh={refreshServices} />
        )}
      </div>
    </main>
  );
}
