import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  saveAuthToken,
} from "../redux/reducers/userInfo/userInfoSlice";
import { useLoginUserMutation } from "../redux/services/authApi";
import { showToast } from "../components/Ui/Toast";
import { useGetProfileQuery } from "../redux/services/studentApi";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";
import { Helmet } from "react-helmet-async";
import Buttons from "../components/Ui/Buttons";

const LoginPage = () => {
  const { loading, error, isLoggedIn, user } = useSelector(
    (state) => state.userInfo,
  );
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { handleError } = useApiErrorHandling();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();

  const {
    data: profileData,
    isSuccess: profileSuccess,
    error: profileError,
  } = useGetProfileQuery(undefined, {
    skip: !shouldFetchProfile,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isLoggedIn && user && user.role === "student") {
      navigate("/student/dashboard");
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    if (profileSuccess && profileData && loginData) {
      dispatch(
        userLoginSuccess({
          access_token: loginData.access_token,
          role: loginData.role || "student",
          user: profileData,
          permissions: loginData.permissions || [],
        }),
      );
      setShouldFetchProfile(false);
      setLoginData(null);
      navigate("/student/dashboard");
    } else if (profileError && loginData) {
      handleError(profileError);
      dispatch(userLoginFailure("Failed to fetch user profile"));
      setShouldFetchProfile(false);
      setLoginData(null);
    }
  }, [profileSuccess, profileData, profileError, loginData]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const userRoles = Array.isArray(user.role) ? user.role : [user.role];
      if (userRoles.includes("student")) {
        navigate("/student/dashboard");
      } else if (userRoles.includes("admin")) {
        navigate("/admin/dashboard");
      }
    }
  }, [isLoggedIn, user, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLoginRequest());

    try {
      const response = await loginUser({
        username: formData.email,
        password: formData.password,
      }).unwrap();

      if (response?.access_token) {
        dispatch(saveAuthToken(response.access_token));
        setLoginData(response);
        setTimeout(() => {
          setShouldFetchProfile(true);
        }, 200);
      } else {
        const errorMsg = "Please enter correct student credentials.";
        showToast(errorMsg, "error");
        dispatch(userLoginFailure(errorMsg));
      }
    } catch (err) {
      handleError(err);
      dispatch(userLoginFailure(err?.data?.detail || "Invalid credentials"));
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Student Login | CareerCompass — Career Counselling for Class 9–12
        </title>
        <meta
          name="description"
          content="Login to your CareerCompass account for personalized career guidance, scientific assessments, AI-powered career roadmaps, and expert counselling."
        />
        <meta
          name="keywords"
          content="CareerCompass login, student login, career counselling login, career guidance portal, career assessment login, student dashboard, career planning, subject selection after 10th, subject selection after 12th"
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
                Welcome back
              </h1>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Sign in to continue your career journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="username"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{
                      border: "1px solid #E2E8F0",
                      background: "white",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid #2563EB";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid #E2E8F0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                    style={{ color: "#0F172A" }}
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium hover:underline"
                    style={{ color: "#2563EB" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
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
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{
                      border: "1px solid #E2E8F0",
                      background: "white",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid #2563EB";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid #E2E8F0";
                      e.target.style.boxShadow = "none";
                    }}
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
              </div>

              {/* Sign in button */}
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
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Buttons>
            </form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: "#64748B" }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold hover:underline"
                  style={{ color: "#2563EB" }}
                >
                  Create account
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
                YOUR CAREER COMPASS
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              Find your path. Choose with confidence.
            </h2>
            <p
              className="text-sm lg:text-base leading-relaxed"
              style={{ color: "#BFDBFE" }}
            >
              Your personalized assessment, AI-powered career roadmap, and
              counsellor session — all in one place.
            </p>

            {/* Feature highlights */}
            <div
              className="mt-8 pt-6 space-y-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
            >
              {[
                "Built on established psychometric concepts",
                "Personalized for every student",
                "Designed for Indian education paths",
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

export default LoginPage;
