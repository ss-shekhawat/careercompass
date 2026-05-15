import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  LogOut,
  BarChart3,
  Users,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";
import Buttons from "../../components/Ui/Buttons";
import LogoutModal from "../../components/LogoutModal";

const AdminDashboardStub = () => {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <header
        className="bg-white px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid #E2E8F0" }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo-icon.svg" alt="CareerCompass" className="w-8 h-8" />
          <div>
            <span className="text-base font-semibold">
              <span style={{ color: "#0F172A" }}>Career</span>
              <span style={{ color: "#2563EB", marginLeft: "4px" }}>
                Compass
              </span>
            </span>
            <p
              className="text-xs"
              style={{ color: "#94A3B8", letterSpacing: "0.5px" }}
            >
              ADMIN PANEL
            </p>
          </div>
        </div>

        <Buttons
          onClick={() => setLogoutModalOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold"
          style={{ background: "#FEF2F2", color: "#DC2626", border: "none" }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Buttons>
      </header>

      {/* Body */}
      <main className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome card */}
          <div
            className="rounded-2xl p-8 md:p-10 mb-6 text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
            }}
          >
            <div
              className="absolute"
              style={{
                top: "-40px",
                right: "-40px",
                opacity: 0.08,
                pointerEvents: "none",
              }}
            >
              <svg width="200" height="200" viewBox="0 0 80 80">
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
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{ background: "rgba(251, 191, 36, 0.15)" }}
              >
                <Shield className="w-3.5 h-3.5" style={{ color: "#FBBF24" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#FBBF24", letterSpacing: "0.8px" }}
                >
                  RESTRICTED AREA
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to Admin Panel
              </h1>
              <p className="text-sm md:text-base" style={{ color: "#94A3B8" }}>
                Admin features are coming soon. We're currently focused on
                perfecting the student experience first.
              </p>
            </div>
          </div>

          {/* Feature cards (coming soon) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Users,
                title: "User Management",
                desc: "Manage students, counsellors, and admins",
              },
              {
                icon: BarChart3,
                title: "Reports & Analytics",
                desc: "Review and approve student assessments",
              },
              {
                icon: FileText,
                title: "Content Management",
                desc: "Manage test questions and career data",
              },
              {
                icon: Settings,
                title: "Platform Settings",
                desc: "Configure plans, payments, and notifications",
              },
              {
                icon: Sparkles,
                title: "AI Configuration",
                desc: "Tune AI report generation parameters",
              },
              {
                icon: Shield,
                title: "Security & Access",
                desc: "Role-based permissions and audit logs",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5"
                  style={{
                    border: "0.5px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "#F1F5F9" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#64748B" }} />
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: "#FEF3C7", color: "#B45309" }}
                    >
                      Soon
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: "#0F172A" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div
            className="mt-8 rounded-lg p-4 text-center"
            style={{ background: "white", border: "0.5px solid #E2E8F0" }}
          >
            <p className="text-xs" style={{ color: "#94A3B8" }}>
              You're successfully authenticated as an admin. Full admin panel
              launching in upcoming versions.
            </p>
          </div>
        </div>
      </main>

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboardStub;
