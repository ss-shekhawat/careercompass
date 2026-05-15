import React from "react";
import {
  Calendar,
  Crown,
  CheckCircle,
  Clock,
  AlertCircle,
  Tag,
  ArrowRight,
} from "lucide-react";
import Buttons from "../Ui/Buttons";
import { Link, useNavigate } from "react-router-dom";

const MySubscription = ({ subscription, availablePlans, isLoading, error }) => {
  const navigate = useNavigate();
  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 animate-pulse" style={cardStyle}>
        <div
          className="h-6 rounded w-1/3 mb-4"
          style={{ background: "#E2E8F0" }}
        ></div>
        <div
          className="h-32 rounded mb-3"
          style={{ background: "#E2E8F0" }}
        ></div>
        <div
          className="h-4 rounded w-2/3"
          style={{ background: "#E2E8F0" }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl p-6"
        style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
      >
        <div className="flex items-center gap-2" style={{ color: "#B91C1C" }}>
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Unable to load subscription</p>
        </div>
      </div>
    );
  }

  // No active plan state
  if (!subscription) {
    return (
      <div className="bg-white rounded-xl p-6" style={cardStyle}>
        <h3
          className="text-base font-semibold mb-4 flex items-center gap-2"
          style={{ color: "#0F172A" }}
        >
          <Crown className="h-4 w-4" style={{ color: "#FBBF24" }} />
          My Subscription
        </h3>

        <div className="text-center py-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{ background: "#F1F5F9" }}
          >
            <Tag className="w-7 h-7" style={{ color: "#94A3B8" }} />
          </div>
          <h4
            className="text-base font-semibold mb-1"
            style={{ color: "#0F172A" }}
          >
            No active plan
          </h4>
          <p className="text-sm mb-5" style={{ color: "#64748B" }}>
            Subscribe to a plan to unlock career assessments and counselling
          </p>

          <Buttons
            onClick={() => navigate("/student/plans")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "#2563EB", border: "none" }}
          >
            View Plans
            <ArrowRight className="w-4 h-4" />
          </Buttons>
        </div>
      </div>
    );
  }

  const statusBadge = (() => {
    const s = (subscription.status || "").toLowerCase();
    if (s === "active")
      return { bg: "#DCFCE7", color: "#15803D", label: "Active" };
    if (s === "expired")
      return { bg: "#FEF2F2", color: "#B91C1C", label: "Expired" };
    if (s === "expiring soon")
      return { bg: "#FEF3C7", color: "#B45309", label: "Expiring Soon" };
    return {
      bg: "#F1F5F9",
      color: "#475569",
      label: subscription.status || "Inactive",
    };
  })();

  return (
    <div className="bg-white rounded-xl p-6" style={cardStyle}>
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-base font-semibold flex items-center gap-2"
          style={{ color: "#0F172A" }}
        >
          <Crown className="h-4 w-4" style={{ color: "#FBBF24" }} />
          My Subscription
        </h3>
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: statusBadge.bg, color: statusBadge.color }}
        >
          {statusBadge.label}
        </span>
      </div>

      {/* Plan Card */}
      <div
        className="rounded-xl p-5 mb-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: "-30px",
            right: "-30px",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        >
          <svg width="160" height="160" viewBox="0 0 80 80">
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
          </svg>
        </div>

        <div className="relative z-10">
          <p
            className="font-semibold mb-2"
            style={{
              color: "#FBBF24",
              fontSize: "10px",
              letterSpacing: "1.2px",
            }}
          >
            CURRENT PLAN
          </p>
          <h4 className="text-xl font-bold text-white mb-1">
            {subscription.product_name}
          </h4>
          {subscription.plan_type && (
            <p className="text-sm capitalize" style={{ color: "#BFDBFE" }}>
              {subscription.plan_type}
            </p>
          )}

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">
              ₹
              {subscription.discounted_amount ??
                subscription.actual_amount ??
                "—"}
            </span>
            {subscription.actual_amount &&
              subscription.discounted_amount &&
              subscription.actual_amount > subscription.discounted_amount && (
                <span
                  className="text-sm line-through"
                  style={{ color: "#BFDBFE" }}
                >
                  ₹{subscription.actual_amount}
                </span>
              )}
          </div>
        </div>
      </div>

      {/* Dates */}
      {(subscription.purchase_date || subscription.valid_until) && (
        <div className="grid grid-cols-2 gap-3 mb-5">
          {subscription.purchase_date && (
            <div
              className="rounded-lg p-3"
              style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3" style={{ color: "#94A3B8" }} />
                <p className="text-xs" style={{ color: "#94A3B8" }}>
                  Started
                </p>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>
                {new Date(subscription.purchase_date).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" },
                )}
              </p>
            </div>
          )}
          {subscription.valid_until && (
            <div
              className="rounded-lg p-3"
              style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3 h-3" style={{ color: "#94A3B8" }} />
                <p className="text-xs" style={{ color: "#94A3B8" }}>
                  Valid Until
                </p>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>
                {new Date(subscription.valid_until).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" },
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      {Array.isArray(subscription.features) &&
        subscription.features.length > 0 && (
          <div>
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: "#94A3B8", letterSpacing: "0.5px" }}
            >
              INCLUDED IN YOUR PLAN
            </p>
            <ul className="space-y-2">
              {subscription.features.slice(0, 5).map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "#475569" }}
                >
                  <CheckCircle
                    className="h-4 w-4 flex-shrink-0 mt-0.5"
                    style={{ color: "#15803D" }}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {subscription.features.length > 5 && (
              <p className="text-xs mt-2" style={{ color: "#94A3B8" }}>
                + {subscription.features.length - 5} more features
              </p>
            )}
          </div>
        )}

      {/* Upgrade prompt for non-counselling plans */}
      {(subscription.product_id || subscription.plan_type) && (
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid #E2E8F0" }}>
          <p className="text-xs mb-2" style={{ color: "#64748B" }}>
            Want to add counselling? Upgrade your plan.
          </p>
          <Link
            to="/student/plans"
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            style={{ color: "#2563EB", textDecoration: "none" }}
          >
            View available plans <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MySubscription;
