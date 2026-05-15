import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Brain, Lightbulb, Target, ArrowRight } from "lucide-react";
import Buttons from "../../../components/Ui/Buttons";

const instructionDetails = {
  "personality-test": {
    icon: Brain,
    name: "Personality Test",
    subtitle: "Discover your natural tendencies & behavioral patterns",
    overview:
      "Personality test questions have two choices — select 1 of the 2 choices for each situation.",
    guidelines: [
      {
        title: "✨ No right or wrong answers",
        text: "Remember there are NO right or wrong answers here. Answer as you relate to the situation and respond as you would normally act in real life.",
      },
      {
        title: "⏱️ Time limit — 30 seconds",
        text: "This 30-second time limit is suggested only. You should be able to answer in much less time. Even if you take longer, there is no issue — go at your own pace.",
      },
    ],
    buttonText: "Start Personality Test",
    continueButtonText: "Continue Personality Test",
  },
  "interest-test": {
    icon: Lightbulb,
    name: "Interest Test",
    subtitle: "Explore your passions & career interests",
    overview:
      "For each activity, share your eagerness to try it on a scale from 'Completely Like' to 'Completely Dislike'.",
    guidelines: [
      {
        title: "✨ No right or wrong answers",
        text: "Imagine you have a chance to try different activities for 1 day in your life. For each activity displayed, share your eagerness to try it (Completely Like → Completely Dislike).",
      },
      {
        title: "⏱️ Time limit — 30 seconds",
        text: "This 30-second time limit is suggested only. You should be able to answer in much less time. Even if you take longer, there is no issue — go at your own pace.",
      },
    ],
    buttonText: "Start Interest Test",
    continueButtonText: "Continue Interest Test",
  },
  "aptitude-test": {
    icon: Target,
    name: "Aptitude Test",
    subtitle: "Assess your problem-solving & analytical skills",
    overview:
      "The test has three sections: Numerical, Verbal & Logical. Select 1 of the 4 choices for each question.",
    guidelines: [
      {
        title: "✅ Right and wrong answers",
        text: "Remember these are Aptitude questions which DO have right and wrong answers. Hence read each question carefully and then select the correct answer.",
      },
      {
        title: "⏱️ Time limit — 90 sec",
        text: "Suggested only. Even if you take longer, it's fine.",
      },
    ],
    buttonText: "Start Aptitude Test",
    continueButtonText: "Continue Aptitude Test",
  },
};

const AssessmentInstructionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { testType, isResume, sessionId, reset, ...restState } =
    location.state || {};
  const details = instructionDetails[testType];

  if (!details) {
    return (
      <div
        className="flex items-center justify-center min-h-screen text-sm"
        style={{ color: "#DC2626" }}
      >
        Invalid test type provided.
      </div>
    );
  }

  const handleStart = () => {
    navigate("/student/resume-assessment", {
      state: { sessionId, testType, isResume, reset, ...restState },
    });
  };

  const Icon = details.icon;

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: "#F8FAFC" }}>
      <div className="max-w-3xl mx-auto">
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{
            border: "0.5px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
          }}
        >
          {/* Header */}
          <div
            className="p-6 md:p-8 text-white text-center relative overflow-hidden"
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
            <div
              className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative z-10"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold mb-1 relative z-10">
              {details.name}
            </h1>
            <p
              className="text-sm opacity-90 relative z-10"
              style={{ color: "#BFDBFE" }}
            >
              {details.subtitle}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="pl-5" style={{ borderLeft: "3px solid #2563EB" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5" style={{ color: "#2563EB" }} />
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "#0F172A" }}
                  >
                    Test Overview
                  </h3>
                </div>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "#475569" }}
                >
                  {details.overview}
                </p>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: "#EFF6FF", border: "0.5px solid #DBEAFE" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" style={{ color: "#2563EB" }} />
                  <h4
                    className="text-base font-bold"
                    style={{ color: "#0F172A" }}
                  >
                    Important Guidelines
                  </h4>
                </div>
                <div className="space-y-3">
                  {details.guidelines.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-3.5"
                      style={{
                        background: "white",
                        border: "0.5px solid #E2E8F0",
                      }}
                    >
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: "#0F172A" }}
                      >
                        {item.title}
                      </p>
                      <p className="text-sm" style={{ color: "#475569" }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Buttons
                onClick={handleStart}
                className="rounded-lg font-semibold px-6 py-3 text-base text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-md hover:shadow-lg"
                style={{ background: "#2563EB", border: "none" }}
              >
                {isResume ? details.continueButtonText : details.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Buttons>
              <p className="mt-4 text-xs" style={{ color: "#94A3B8" }}>
                Click the button above when you're ready to begin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentInstructionPage;
