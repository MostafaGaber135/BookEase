import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import PrimaryActionButton from "./components/PrimaryActionButton";
import Panel from "./components/Panel";
import BookingCard from "./components/BookingCard";
import EmptyState from "./components/EmptyState";
import api from "../../api/axios";
import { getToken, clearToken, clearUser, notifyAuthChanged } from "../../utils/authToken";
import Loader from "../../components/ui/Loader";

export default function MyBookings() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function goToServicesPage() {
        navigate("/services");
    }

    function goToNewBookingPage() {
        navigate("/book");
    }

    const normalizeStatus = (s) => {
        const v = (s || "").toLowerCase();
        if (v === "pending") return "Pending";
        if (v === "confirmed") return "Confirmed";
        if (v === "cancelled") return "Cancelled";
        if (v === "completed") return "Completed";
        return "Pending";
    };

    useEffect(() => {
        const token = getToken();

        if (!token) {
            navigate("/signin", { replace: true });
            return;
        }

        const fetchMyBookings = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await api.get("/api/bookings/my");

                const list = Array.isArray(res.data?.bookings) ? res.data.bookings : [];

                const mapped = list.map((b) => ({
                    id: b._id,
                    title: b.serviceName,
                    date: b.date,
                    time: b.time,
                    status: normalizeStatus(b.status),
                }));

                setBookings(mapped);
            } catch (e) {
                const code = e?.response?.status;

                if (code === 401) {
                    clearToken();
                    clearUser();
                    notifyAuthChanged();
                    navigate("/signin", { replace: true });
                    return;
                }

                setError(
                    e?.response?.data?.message ||
                    e?.message ||
                    "Failed to load bookings, please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyBookings();
    }, [navigate]);

    return (
        <div className="bg-[#f8fafa] w-full min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <PageHeader
                    title="My Bookings"
                    subtitle="Manage and track your appointments"
                    action={
                        <PrimaryActionButton
                            text="New Booking"
                            onClick={goToNewBookingPage}
                            icon={
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 5v14M5 12h14"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            }
                        />
                    }
                />

                <div className="mt-6 sm:mt-8">
                    {loading ? (
                        <Panel className="p-4 sm:p-6">
                            <Loader />
                        </Panel>
                    ) : error ? (
                        <Panel className="p-4 sm:p-6">
                            <p className="text-sm text-red-600">{error}</p>
                        </Panel>
                    ) : bookings.length > 0 ? (
                        <Panel className="p-4 sm:p-6">
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        title={booking.title}
                                        date={booking.date}
                                        time={booking.time}
                                        status={booking.status}
                                    />
                                ))}
                            </div>
                        </Panel>
                    ) : (
                        <EmptyState
                            title="No Bookings Yet"
                            subtitle="You haven't made any bookings yet. Start by booking your first service!"
                            buttonText="Browse Services"
                            onButtonClick={goToServicesPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
