import React from "react";
import {
  X,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Buttons from "../Ui/Buttons";

const TraitDetailModal = ({ isOpen, onClose, trait }) => {
  if (!isOpen || !trait) return null;

  // Determine category styling
  const categoryStyle = (() => {
    const cat = (trait.category || "").toLowerCase();
    if (cat.includes("high"))
      return { bg: "#DCFCE7", color: "#15803D", label: "High" };
    if (cat.includes("low moderate") || cat.includes("low-moderate"))
      return { bg: "#FEF3C7", color: "#B45309", label: "Low Moderate" };
    if (cat.includes("moderate"))
      return { bg: "#FEF3C7", color: "#B45309", label: "Moderate" };
    if (cat.includes("low"))
      return { bg: "#FEF2F2", color: "#DC2626", label: "Low" };
    return {
      bg: "#DBEAFE",
      color: "#2563EB",
      label: trait.category || "Category",
    };
  })();

  // Trait-specific details
  const traitDetails = {
    "Numerical Ability": {
      description:
        "Numerical ability measures your skill in working with numbers, mathematical reasoning, and problem-solving with quantitative data.",
      icon: TrendingUp,
      strengths: [
        "Solving mathematical problems efficiently",
        "Working with data and statistics",
        "Quantitative analysis and reasoning",
        "Pattern recognition in numbers",
      ],
      improvements: [
        "Practice mental math regularly",
        "Work on speed and accuracy",
        "Solve word problems",
        "Learn shortcuts for calculations",
      ],
      careers: [
        "Engineering",
        "Finance",
        "Data Science",
        "Accounting",
        "Statistics",
      ],
    },
    "Verbal Ability": {
      description:
        "Verbal ability measures your skill in understanding written language, vocabulary, comprehension, and verbal reasoning.",
      icon: BookOpen,
      strengths: [
        "Strong reading comprehension",
        "Effective verbal communication",
        "Building vocabulary quickly",
        "Critical analysis of text",
      ],
      improvements: [
        "Read books and articles regularly",
        "Practice analogies and reasoning",
        "Build a vocabulary journal",
        "Engage in discussions and debates",
      ],
      careers: [
        "Journalism",
        "Law",
        "Teaching",
        "Content Writing",
        "Public Relations",
      ],
    },
    "Logical Reasoning": {
      description:
        "Logical reasoning measures your ability to analyze patterns, draw conclusions, and solve problems using logical thinking.",
      icon: Target,
      strengths: [
        "Pattern recognition and analysis",
        "Step-by-step problem solving",
        "Identifying relationships",
        "Critical thinking",
      ],
      improvements: [
        "Practice puzzles and brain teasers",
        "Study formal logic basics",
        "Solve logical reasoning problems",
        "Play strategy games",
      ],
      careers: [
        "Software Development",
        "Research",
        "Strategy Consulting",
        "Law",
        "Architecture",
      ],
    },
  };

  const details = traitDetails[trait.name] || {
    description: trait.description || "Detailed insights about this trait.",
    icon: Award,
    strengths: [],
    improvements: [],
    careers: [],
  };

  const Icon = details.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15, 23, 42, 0.6)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: "-30px",
              right: "-30px",
              opacity: 0.1,
              pointerEvents: "none",
            }}
          >
            <svg width="180" height="180" viewBox="0 0 80 80">
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

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{trait.name}</h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: categoryStyle.bg,
                      color: categoryStyle.color,
                    }}
                  >
                    {categoryStyle.label}
                  </span>
                  <span className="text-sm" style={{ color: "#BFDBFE" }}>
                    Score: {trait.score}%
                  </span>
                </div>
              </div>
            </div>

            <Buttons
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "none",
              }}
            >
              <X className="w-4 h-4" />
            </Buttons>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "#0F172A" }}
            >
              About This Trait
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
              {details.description}
            </p>
          </div>

          {/* Strengths */}
          {details.strengths.length > 0 && (
            <div>
              <h3
                className="text-sm font-semibold mb-3 flex items-center gap-1.5"
                style={{ color: "#0F172A" }}
              >
                <CheckCircle className="w-4 h-4" style={{ color: "#15803D" }} />
                Your Strengths
              </h3>
              <ul className="space-y-2">
                {details.strengths.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm rounded-lg p-3"
                    style={{
                      background: "#F0FDF4",
                      color: "#15803D",
                      border: "0.5px solid #BBF7D0",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: "#15803D" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Areas to Improve */}
          {details.improvements.length > 0 && (
            <div>
              <h3
                className="text-sm font-semibold mb-3 flex items-center gap-1.5"
                style={{ color: "#0F172A" }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: "#2563EB" }} />
                Ways to Improve
              </h3>
              <ul className="space-y-2">
                {details.improvements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm rounded-lg p-3"
                    style={{
                      background: "#EFF6FF",
                      color: "#1E40AF",
                      border: "0.5px solid #DBEAFE",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: "#2563EB" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suitable Careers */}
          {details.careers.length > 0 && (
            <div>
              <h3
                className="text-sm font-semibold mb-3 flex items-center gap-1.5"
                style={{ color: "#0F172A" }}
              >
                <Award className="w-4 h-4" style={{ color: "#FBBF24" }} />
                Suitable Career Paths
              </h3>
              <div className="flex flex-wrap gap-2">
                {details.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: "#FEF3C7", color: "#B45309" }}
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          <div
            className="rounded-lg p-3 flex items-start gap-2"
            style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}
          >
            <AlertCircle
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: "#94A3B8" }}
            />
            <p className="text-xs" style={{ color: "#64748B" }}>
              These insights are based on your assessment. For personalized
              guidance, consider booking a counsellor session.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex justify-end"
          style={{ borderTop: "1px solid #E2E8F0" }}
        >
          <Buttons
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "#2563EB", border: "none" }}
          >
            Close
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default TraitDetailModal;
