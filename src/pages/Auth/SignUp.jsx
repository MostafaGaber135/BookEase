import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import AuthField from "./components/AuthField";
import AuthButton from "./components/AuthButton";
import AuthFooterLink from "./components/AuthFooterLink";
import PasswordToggle from "./components/PasswordToggle";
import api from "../../api/axios";
import { setToken, setUser, notifyAuthChanged } from "../../utils/authToken";
import toast from "react-hot-toast";
import { isValidEmail, passwordRules, passwordRulesMessage } from "../../utils/validation";
import { getApiMessage } from "../../utils/apiError";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", password: "" });

  const rules = passwordRules(password);
  const passwordMsg = passwordRulesMessage(rules);
  const canSubmit = name.trim() && email.trim() && password && !loading;

  const validate = () => {
    const next = { name: "", email: "", password: "" };
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!isValidEmail(email)) next.email = "Invalid email";
    if (!password) next.password = "Password is required";
    else if (passwordMsg) next.password = passwordMsg;
    setFieldErrors(next);
    return !next.name && !next.email && !next.password;
  };

  const handleSignUp = async () => {
    try {
      if (!validate()) return;
      setLoading(true);
      setError("");

      const res = await api.post("/api/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      const token = res.data?.token || res.data?.accessToken;

      if (token) {
        setToken(token);

        const apiUser = res.data?.user;

        if (apiUser?.name) {
          setUser({
            id: apiUser.id || apiUser._id,
            name: apiUser.name || name.trim(),
            email: apiUser.email || email.trim(),
            role: apiUser.role,
          });
        } else {
          setUser({ name: name.trim(), email: email.trim() });
        }

        notifyAuthChanged();
        toast.success("Account created successfully");
        navigate("/mybooking", { replace: true });
      } else {
        toast.success("Account created. Please sign in.");
        navigate("/signin", { replace: true });
      }
    } catch (e) {
      const msg = getApiMessage(e, "Sign up failed, please try again.");
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to start booking appointments"
      footer={
        <AuthFooterLink
          text="Already have an account?"
          linkText="Sign in"
          to="/signin"
        />
      }
    >
      <div className="space-y-5 sm:space-y-6">
        <AuthField
          label="Full Name"
          value={name}
          onChange={(v) => {
            setName(v);
            if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: "" }));
          }}
          placeholder="John Smith"
          error={fieldErrors.name}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21a8 8 0 1 0-16 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: "" }));
          }}
          placeholder="john@example.com"
          error={fieldErrors.email}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16v12H4V6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <AuthField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: "" }));
          }}
          placeholder="••••••••"
          error={fieldErrors.password}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 11V8a5 5 0 0 1 10 0v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 11h12v10H6V11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          }
          right={
            <PasswordToggle
              shown={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
          }
        />

        {error ? <p className="text-sm text-red-600 text-center">{error}</p> : null}

        <AuthButton
          text={loading ? "Creating..." : "Create Account"}
          onClick={handleSignUp}
          disabled={!canSubmit}
          loading={loading}
        />
      </div>
    </AuthLayout>
  );
}
