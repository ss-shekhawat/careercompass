import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useLoginUserMutation } from "../redux/services/authApi";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
} from "../redux/reducers/userInfo/userInfoSlice";
import { showToast } from "../components/Ui/Toast";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Buttons from "../components/Ui/Buttons";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";
import { ADMIN_PERMISSION_MAP, ADMIN_NAV_ITEMS } from "../data/content";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleError } = useApiErrorHandling();

  const { loading, error, isLoggedIn, user, permissions } = useSelector(
    (state) => state.userInfo,
  );

  useEffect(() => {
    if (isLoggedIn && user) {
      const userRoles = Array.isArray(user.role) ? user.role : [user.role];
      if (userRoles.includes("admin") || userRoles.includes("super_admin")) {
        const allowedItems = ADMIN_NAV_ITEMS.filter((item) => {
          const permName = ADMIN_PERMISSION_MAP[item.name] || item.name;
          return permissions.includes(permName);
        });

        if (allowedItems.length > 0) {
          navigate(allowedItems[0].href);
        } else {
          const fallbackPermissions = permissions || [];
          const fallbackItems = ADMIN_NAV_ITEMS.filter((item) => {
            const permName = ADMIN_PERMISSION_MAP[item.name] || item.name;
            return fallbackPermissions.includes(permName);
          });
          if (fallbackItems.length > 0) {
            navigate(fallbackItems[0].href);
          } else {
            navigate("/admin/dashboard");
          }
        }
      }
    }
  }, [isLoggedIn, user, permissions, navigate]);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLoginRequest());
    try {
      const res = await loginUser({
        username: formData.username,
        password: formData.password,
      }).unwrap();

      const resRoles = Array.isArray(res?.role) ? res.role : [res?.role];
      if (resRoles.includes("admin") || resRoles.includes("super_admin")) {
        dispatch(userLoginSuccess(res));
        const permissions = res.permissions || [];
        const allowedItems = ADMIN_NAV_ITEMS.filter((item) => {
          const permName = ADMIN_PERMISSION_MAP[item.name] || item.name;
          return permissions.includes(permName);
        });

        if (allowedItems.length > 0) {
          navigate(allowedItems[0].href);
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        showToast("Please enter correct admin credentials.", "error");
        dispatch(userLoginFailure("Please enter correct admin credentials."));
      }
    } catch (err) {
      handleError(err);
      dispatch(userLoginFailure(err?.data?.detail || "Invalid credentials"));
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
        <title>Admin Login | CareerCompass</title>
        <meta
          name="description"
          content="Admin access to CareerCompass dashboard."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex" style={{ background: "#F8FAFC" }}>
        {/* LEFT — form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
              style={{ color: "#64748B" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{ background: "#FEF3C7" }}
              >
                <Shield className="w-3.5 h-3.5" style={{ color: "#B45309" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#B45309", letterSpacing: "0.4px" }}
                >
                  ADMIN ACCESS
                </span>
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold mb-1.5"
                style={{ color: "#0F172A" }}
              >
                Admin sign in
              </h1>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Access your CareerCompass admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "#0F172A" }}
                >
                  Username
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#94A3B8" }}
                  />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoComplete="username"
                    placeholder="Admin username"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                    style={{ border: "1px solid #E2E8F0", background: "white" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

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
                  "Signing in..."
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Buttons>
            </form>
          </div>
        </div>

        {/* RIGHT — admin brand */}
        <div
          className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: "-60px",
              right: "-60px",
              opacity: 0.06,
              pointerEvents: "none",
            }}
          >
            <Shield
              style={{ width: "320px", height: "320px", color: "white" }}
            />
          </div>

          <div className="relative z-10 max-w-md px-10 py-12 text-white">
            <div
              className="inline-block px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(251,191,36,0.15)" }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: "#FBBF24", letterSpacing: "0.6px" }}
              >
                RESTRICTED AREA
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              Admin Dashboard
            </h2>
            <p
              className="text-sm lg:text-base leading-relaxed"
              style={{ color: "#94A3B8" }}
            >
              Manage tests, reports, users, products, and the entire
              CareerCompass platform from one place.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
