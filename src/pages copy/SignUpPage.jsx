import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import {
  Mail,
  Eye,
  EyeOff,
  X,
  Check,
  User,
  Phone,
  Lock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useRegisterUserMutation } from "../redux/services/authApi";
import { showToast } from "../components/Ui/Toast";
import { useDispatch } from "react-redux";
import {
  saveTestId,
  savePromoCode,
} from "../redux/reducers/userInfo/userInfoSlice";
import Buttons from "../components/Ui/Buttons";
import { getDateLimits } from "../utils/dateHelpers";
import { Helmet } from "react-helmet-async";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    promo_code: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { referralCode, testId, promoCode } = useParams();
  const dispatch = useDispatch();

  // Extract referral code and testId from query params
  const rawCode = searchParams.get("code");
  let queryReferralCode = null;
  let queryTestId = null;
  let queryPromoCode = null;

  if (rawCode) {
    const parts = rawCode.split("/");
    queryReferralCode = parts[0];
    queryTestId = parts[1] || null;
    queryPromoCode = parts[2] || null;
  }

  const finalReferralCode = referralCode || queryReferralCode;
  const finalTestId = testId || queryTestId;
  const finalPromoCode = promoCode || queryPromoCode || "";

  const [signupUser, { isLoading }] = useRegisterUserMutation();

  // Set referral code in form when available
  useEffect(() => {
    if (finalReferralCode) {
      setFormData((prev) => ({
        ...prev,
        organization: finalReferralCode,
      }));
    }
  }, [finalReferralCode]);

  // Set promo code in form and save to redux when available
  useEffect(() => {
    if (finalPromoCode) {
      setFormData((prev) => ({ ...prev, promo_code: finalPromoCode }));
      dispatch(savePromoCode(finalPromoCode));
      // also persist for payment flow consistency
      localStorage.setItem("userPromoCode", finalPromoCode);
    }
  }, [finalPromoCode, dispatch]);

  // Save testId to Redux when available
  useEffect(() => {
    if (finalTestId) {
      dispatch(saveTestId(finalTestId));
    }
  }, [finalTestId, dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = {
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone,
      };

      // If the user came from a school/organization, include school and role
      if (formData.organization) {
        payload.school = formData.organization;
        payload.role = "student";
      }

      const response = await signupUser(payload).unwrap();

      // Save promo code to localStorage for later use during payment
      if (formData.promo_code) {
        localStorage.setItem("userPromoCode", formData.promo_code);
      }

      // Save testId during signup
      if (finalTestId) {
        dispatch(saveTestId(finalTestId));
      }

      showToast("Account created successfully!", "success");

      // Navigate to OTP verification
      navigate("/otp-verification", {
        state: {
          phone: formData.phone,
          email: formData.email,
          hasOrganization: !!formData.organization,
        },
      });
    } catch (err) {
      let apiMsg = "Signup failed";

      if (err?.data?.detail) {
        apiMsg += ": " + err.data.detail;
      } else if (err?.data?.message) {
        apiMsg += ": " + err.data.message;
      } else if (err?.message) {
        apiMsg += ": " + err.message;
      } else if (err?.data) {
        const errorData =
          typeof err.data === "string" ? err.data : JSON.stringify(err.data);
        apiMsg += ": " + errorData;
      }

      setErrors({ api: apiMsg });
      showToast(apiMsg, "error");
    }
  };

  const { min, max } = getDateLimits();

  const passwordRules = [
    {
      label: "8 characters minimum",
      test: (pw) => pw.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      label: "At least one lowercase letter",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      label: "At least one number",
      test: (pw) => /[0-9]/.test(pw),
    },
    {
      label: "At least one special character",
      test: (pw) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
    },
  ];

  /* ─── Reusable input focus/blur handlers ─── */
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
        <title>
          Create Account | CareerCompass — Career Counselling for Class 9–12
        </title>
        <meta
          name="description"
          content="Create your free CareerCompass account for personalized career guidance, scientific assessments, AI-powered career roadmaps, and expert counselling."
        />
        <meta
          name="keywords"
          content="CareerCompass signup, student signup, career counselling signup, create career guidance account, career assessment signup, student registration, career planning, subject selection after 10th, subject selection after 12th"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen flex" style={{ background: "#F8FAFC" }}>
        {/* ── LEFT — Form ── */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="w-full max-w-md">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
              style={{ color: "#64748B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F172A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
            </Link>

            {/* Logo + heading */}
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
              <h1
                className="text-2xl md:text-3xl font-bold mb-1.5"
                style={{ color: "#0F172A" }}
              >
                Create your account
              </h1>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Start your journey to career clarity in just a minute
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "#0F172A" }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#94A3B8" }}
                  />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{ border: "1px solid #E2E8F0", background: "white" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
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
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{ border: "1px solid #E2E8F0", background: "white" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "#0F172A" }}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#94A3B8" }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit phone number"
                    inputMode="numeric"
                    maxLength="10"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{ border: "1px solid #E2E8F0", background: "white" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "#0F172A" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#94A3B8" }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{ border: "1px solid #E2E8F0", background: "white" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <Buttons
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    style={{
                      color: "#94A3B8",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Buttons>
                </div>

                {/* Password strength UI */}
                {formData.password.length > 0 && (
                  <div
                    className="mt-2 p-3 rounded-lg space-y-1"
                    style={{
                      background: "#F8FAFC",
                      border: "0.5px solid #E2E8F0",
                    }}
                  >
                    {passwordRules.map((rule, idx) => {
                      const passed = rule.test(formData.password);
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
                          <span>{rule.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
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
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{ border: "1px solid #E2E8F0", background: "white" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <Buttons
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    style={{
                      color: "#94A3B8",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Buttons>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* API Error Display */}
              {errors.api && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    background: "#FEF2F2",
                    color: "#B91C1C",
                    border: "1px solid #FECACA",
                  }}
                >
                  {errors.api}
                </div>
              )}

              {/* Submit Button */}
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
                  "Creating account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Buttons>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: "#64748B" }}>
                Already have an account?{" "}
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

        {/* ── RIGHT — Brand panel (hidden on mobile) ── */}
        <div
          className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
          }}
        >
          {/* Decorative compass watermark */}
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

          {/* Decorative dot pattern */}
          <div
            className="absolute"
            style={{
              bottom: "-40px",
              left: "-40px",
              opacity: 0.1,
              pointerEvents: "none",
            }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200">
              {[...Array(8)].map((_, row) =>
                [...Array(8)].map((_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={col * 24 + 12}
                    cy={row * 24 + 12}
                    r="2"
                    fill="white"
                  />
                )),
              )}
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-md px-10 py-12 text-white">
            <div
              className="inline-block px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: "#FBBF24", letterSpacing: "0.6px" }}
              >
                START YOUR JOURNEY
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              Discover the path that fits you best.
            </h2>
            <p
              className="text-sm lg:text-base leading-relaxed"
              style={{ color: "#BFDBFE" }}
            >
              Join CareerCompass and get a scientific career assessment, an
              AI-powered career roadmap, and a 1-on-1 counsellor session.
            </p>

            {/* What you get highlights */}
            <div
              className="mt-8 pt-6 space-y-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
            >
              {[
                "Personalized career assessment",
                "AI-powered education roadmap",
                "1-on-1 counsellor conversation",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#FBBF24" }}
                  />
                  <span style={{ color: "#DBEAFE" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
