import React from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import { Calendar, Sparkles, ArrowRight, Bell } from "lucide-react";
import Buttons from "../../components/Ui/Buttons";

const StudentBooking = () => {
  const navigate = useNavigate();

  return (
    <StudentLayout title="Bookings">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1
            className="text-xl md:text-2xl font-bold"
            style={{ color: "#0F172A" }}
          >
            Counsellor Bookings
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            1-on-1 sessions with expert career counsellors
          </p>
        </div>

        {/* Coming Soon Card */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
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
              opacity: 0.1,
              pointerEvents: "none",
            }}
          >
            <svg width="280" height="280" viewBox="0 0 80 80">
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

          {/* Dot pattern */}
          <div
            className="absolute"
            style={{
              bottom: "-30px",
              left: "-30px",
              opacity: 0.1,
              pointerEvents: "none",
            }}
          >
            <svg width="180" height="180" viewBox="0 0 200 200">
              {[...Array(7)].map((_, row) =>
                [...Array(7)].map((_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={col * 28 + 14}
                    cy={row * 28 + 14}
                    r="2"
                    fill="white"
                  />
                )),
              )}
            </svg>
          </div>

          <div className="relative z-10 text-white">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#FBBF24" }} />
              <span
                className="text-xs font-semibold"
                style={{ color: "#FBBF24", letterSpacing: "0.6px" }}
              >
                COMING SOON
              </span>
            </div>

            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              1-on-1 counsellor sessions
            </h2>
            <p
              className="text-sm md:text-base mb-7 max-w-md mx-auto"
              style={{ color: "#BFDBFE" }}
            >
              We're partnering with qualified career counsellors to bring you
              personalized 1-on-1 guidance. Until then, your AI-powered career
              roadmap has you covered.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Buttons
                onClick={() => navigate("/student/dashboard")}
                className="rounded-lg font-semibold px-5 py-2.5 text-sm inline-flex items-center justify-center gap-2"
                style={{
                  background: "#FBBF24",
                  color: "#78350F",
                  border: "none",
                }}
              >
                Continue with AI Guidance
                <ArrowRight className="w-4 h-4" />
              </Buttons>

              <Buttons
                onClick={() => navigate("/student/report")}
                className="rounded-lg font-semibold px-5 py-2.5 text-sm inline-flex items-center justify-center gap-2"
                style={{
                  background: "transparent",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                View My Report
              </Buttons>
            </div>
          </div>
        </div>

        {/* Info section below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            className="bg-white rounded-xl p-5"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: "#DBEAFE" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: "#2563EB" }} />
            </div>
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: "#0F172A" }}
            >
              AI Guidance Available Now
            </h3>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Get your personalized career roadmap based on assessment results.
            </p>
          </div>

          <div
            className="bg-white rounded-xl p-5"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: "#FEF3C7" }}
            >
              <Bell className="w-5 h-5" style={{ color: "#B45309" }} />
            </div>
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: "#0F172A" }}
            >
              Get Notified
            </h3>
            <p className="text-xs" style={{ color: "#64748B" }}>
              We'll email you the moment counsellor sessions go live.
            </p>
          </div>

          <div
            className="bg-white rounded-xl p-5"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: "#DCFCE7" }}
            >
              <Calendar className="w-5 h-5" style={{ color: "#15803D" }} />
            </div>
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: "#0F172A" }}
            >
              Launching Soon
            </h3>
            <p className="text-xs" style={{ color: "#64748B" }}>
              We're vetting qualified counsellors carefully. Quality over speed.
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentBooking;
