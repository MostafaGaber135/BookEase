import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import PrimaryActionButton from "./components/PrimaryActionButton";
import Panel from "./components/Panel";
import BookingCard from "./components/BookingCard";
import EmptyState from "./components/EmptyState";

export default function MyBookings({ bookings = [] }) {
    const navigate = useNavigate();

    function goToServicesPage() {
        navigate("/services");
    }

    function goToNewBookingPage() {
        navigate("/book");
    }

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
                    {bookings.length > 0 ? (
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
