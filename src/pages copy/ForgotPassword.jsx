import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { useForgotPasswordMutation } from "../redux/services/authApi";
import { showToast } from "../components/Ui/Toast";
import { ToastContainer } from "react-toastify";
import Buttons from "../components/Ui/Buttons";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const { handleError } = useApiErrorHandling();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      showToast(`Password reset link sent to ${email}`, "success");
      navigate("/reset-password", { state: { email: email } });
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

  return (
    <>
      <Helmet>
        <title>Forgot Password | CareerCompass</title>
        <meta
          name="description"
          content="Reset your CareerCompass password securely by entering your registered email."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen flex" style={{ background: "#F8FAFC" }}>
        <ToastContainer />

        {/* LEFT — form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="w-full max-w-md">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
              style={{ color: "#64748B" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
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
                <KeyRound className="w-6 h-6" style={{ color: "#2563EB" }} />
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold mb-1.5"
                style={{ color: "#0F172A" }}
              >
                Forgot password?
              </h1>
              <p className="text-sm" style={{ color: "#64748B" }}>
                No worries — enter your email and we'll send you a reset code.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "#0F172A" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#94A3B8" }}
                  />
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{ border: "1px solid #E2E8F0", background: "white" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
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
                  "Sending..."
                ) : (
                  <>
                    Send Reset Code <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Buttons>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: "#64748B" }}>
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold hover:underline"
                  style={{ color: "#2563EB" }}
                >
                  Sign in
                </Link>
              </p>
            </div>
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
                WE'LL HELP YOU BACK IN
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              It happens to the best of us.
            </h2>
            <p
              className="text-sm lg:text-base leading-relaxed"
              style={{ color: "#BFDBFE" }}
            >
              Just one quick email check away from getting your account back.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
