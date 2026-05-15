import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useResetPasswordMutation } from "../redux/services/authApi";
import { showToast } from "../components/Ui/Toast";
import {
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import Buttons from "../components/Ui/Buttons";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";

const passwordCriteria = [
  { label: "8 characters minimum", test: (pw) => pw.length >= 8 },
  { label: "At least one uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "At least one lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "At least one number", test: (pw) => /\d/.test(pw) },
  {
    label: "At least one special character",
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { handleError } = useApiErrorHandling();

  const email = location.state?.email || searchParams.get("email") || "";
  const isPasswordValid = passwordCriteria.every((c) => c.test(newPassword));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showToast(
        "Email is missing. Please go back to forgot password.",
        "error",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (!isPasswordValid) {
      showToast("Password does not meet all requirements", "error");
      return;
    }

    try {
      await resetPassword({ email, otp, new_password: newPassword }).unwrap();
      showToast("Password reset successfully!", "success");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      handleError(err);
    }
  };

  const handleFocus = (e) => {
    e.target.style.border = "1px solid #2563EB";
    e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
  };
  const handleBlur = (e) => {
    e.target.style.border = "1px solid #E2E8F0";
    e.target.style.boxShadow = "none";
  };

  // Invalid access state
  if (!email) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#F8FAFC" }}
      >
        <ToastContainer />
        <div
          className="max-w-md w-full bg-white rounded-xl p-8 text-center"
          style={{
            border: "0.5px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ background: "#FEF2F2" }}
          >
            <X className="w-6 h-6" style={{ color: "#DC2626" }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#0F172A" }}>
            Invalid Access
          </h2>
          <p className="text-sm mb-6" style={{ color: "#64748B" }}>
            Please start from the forgot password page.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block rounded-lg font-semibold px-5 py-2.5 text-sm text-white"
            style={{ background: "#2563EB", textDecoration: "none" }}
          >
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#F8FAFC" }}>
      <ToastContainer />

      {/* LEFT — form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-md">
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
            style={{ color: "#64748B" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>

          <div className="mb-7">
            <Link to="/" className="inline-flex items-center gap-2 mb-5">
              <img
                src="/logo-icon.svg"
                alt="CareerCompass"
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold leading-none">
                <span style={{ color: "#0F172A" }}>Career</span>
                <span style={{ color: "#2563EB", marginLeft: "5px" }}>
                  Compass
                </span>
              </span>
            </Link>

            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ background: "#DBEAFE" }}
            >
              <ShieldCheck className="w-6 h-6" style={{ color: "#2563EB" }} />
            </div>

            <h1
              className="text-2xl md:text-3xl font-bold mb-1.5"
              style={{ color: "#0F172A" }}
            >
              Reset password
            </h1>
            <p className="text-sm" style={{ color: "#64748B" }}>
              Enter the code sent to{" "}
              <span className="font-semibold" style={{ color: "#0F172A" }}>
                {email}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* OTP */}
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#0F172A" }}
              >
                Reset Code
              </label>
              <div className="relative">
                <KeyRound
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#94A3B8" }}
                />
                <input
                  type="text"
                  id="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit code"
                  maxLength="6"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                  style={{ border: "1px solid #E2E8F0", background: "white" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* New password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#0F172A" }}
              >
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#94A3B8" }}
                />
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                  style={{ border: "1px solid #E2E8F0", background: "white" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent border-none cursor-pointer"
                  style={{ color: "#94A3B8" }}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength rules */}
              {newPassword.length > 0 && (
                <div
                  className="mt-2 p-3 rounded-lg space-y-1"
                  style={{
                    background: "#F8FAFC",
                    border: "0.5px solid #E2E8F0",
                  }}
                >
                  {passwordCriteria.map((c, idx) => {
                    const passed = c.test(newPassword);
                    return (
                      <div
                        key={idx}
                        className="flex items-center text-xs gap-2"
                        style={{ color: passed ? "#15803D" : "#94A3B8" }}
                      >
                        {passed ? (
                          <Check className="h-3.5 w-3.5 flex-shrink-0" />
                        ) : (
                          <X className="h-3.5 w-3.5 flex-shrink-0" />
                        )}
                        <span>{c.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#0F172A" }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#94A3B8" }}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                  style={{ border: "1px solid #E2E8F0", background: "white" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent border-none cursor-pointer"
                  style={{ color: "#94A3B8" }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <Buttons
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg font-semibold px-4 py-2.5 text-sm text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: isLoading ? "#93C5FD" : "#2563EB",
                border: "none",
              }}
            >
              {isLoading ? (
                "Resetting..."
              ) : (
                <>
                  Reset Password <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Buttons>
          </form>
        </div>
      </div>

      {/* RIGHT — brand */}
      <div
        className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: "-60px",
            right: "-60px",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        >
          <svg width="320" height="320" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <polygon
              points="40,16 48,36 64,40 48,44 40,64 32,44 16,40 32,36"
              fill="white"
            />
            <circle cx="40" cy="40" r="5" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-md px-10 py-12 text-white">
          <div
            className="inline-block px-3 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <span
              className="text-xs font-semibold"
              style={{ color: "#FBBF24", letterSpacing: "0.6px" }}
            >
              SECURE RESET
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
            Choose a strong, fresh password.
          </h2>
          <p
            className="text-sm lg:text-base leading-relaxed"
            style={{ color: "#BFDBFE" }}
          >
            We'll get you signed back in as soon as it's set. Make it something
            you'll remember.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
