import React, { useState } from "react";
import AuthLayout from "./components/AuthLayout";
import AuthField from "./components/AuthField";
import AuthButton from "./components/AuthButton";
import AuthFooterLink from "./components/AuthFooterLink";
import PasswordToggle from "./components/PasswordToggle";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to start booking appointments"
      footer={<AuthFooterLink text="Already have an account?" linkText="Sign in" to="/signin" />}
    >
      <div className="space-y-5 sm:space-y-6">
        <AuthField
          label="Full Name"
          value={name}
          onChange={setName}
          placeholder="John Smith"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          }
        />

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

        <AuthButton text="Create Account" onClick={() => { }} />
      </div>
    </AuthLayout>
  );
}
