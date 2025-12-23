import React, { useState } from "react";
import AuthLayout from "./components/AuthLayout";
import AuthField from "./components/AuthField";
import AuthButton from "./components/AuthButton";
import AuthFooterLink from "./components/AuthFooterLink";
import PasswordToggle from "./components/PasswordToggle";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to manage your bookings"
            footer={<AuthFooterLink text="Don't have an account?" linkText="Sign up" to="/signup" />}
        >
            <div className="space-y-5 sm:space-y-6">
                <AuthField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="john@example.com"
                    icon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    }
                />

                <AuthField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                    placeholder="••••••••"
                    icon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    }
                    right={<PasswordToggle shown={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
                />

                <AuthButton text="Sign In" onClick={() => { }} />
            </div>
        </AuthLayout>
    );
}
