import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-[#2ec2b3] rounded-xl p-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900">BookEase</span>
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-sm">
              Simplifying appointments for healthcare, fitness, and wellness providers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <Link to="/services" className="hover:text-gray-900 transition">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-gray-900 transition">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-gray-900 transition">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Services</h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>Medical Consultations</li>
              <li>Dental Care</li>
              <li>Fitness Training</li>
              <li>Wellness &amp; Spa</li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-gray-900">Contact Us</h3>

            <ul className="mt-4 space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 text-[#2ec2b3] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                <span className="break-all sm:break-normal">hello@bookease.com</span>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 text-[#2ec2b3] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.11a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 text-[#2ec2b3] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <path d="M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
                <span className="leading-relaxed">
                  123 Wellness Ave, Health City
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200" />

        <div className="py-8 text-center text-gray-600 text-sm sm:text-base">
          © {new Date().getFullYear()} BookEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
