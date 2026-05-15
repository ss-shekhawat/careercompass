import React, { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";

import CTestThankYou from "../assessment/CTestThankYou";
import ITestThankYou from "../assessment/ITestThankYou";
import ATestThankYou from "../assessment/ATestThankYou";

import Buttons from "./Buttons";

const ThankYouScreen = ({ onContinue, completedTest, resumeMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoToNextTest = () => {
    if (typeof onContinue === "function") onContinue();
  };

  const thankYouPages = {
    "personality-test": CTestThankYou,
    "interest-test": ITestThankYou,
    "aptitude-test": ATestThankYou,
  };
  const ThankYouPage = thankYouPages[completedTest] || thankYouPages.default;

  let header = "Thank You!";
  let message = "";
  if (completedTest === "personality-test")
    message = "Thank you for completing the Personality Test.";
  else if (completedTest === "interest-test")
    message = "Thank you for completing the Interest Test.";
  else if (completedTest === "aptitude-test")
    message = "Thank you for completing the Aptitude Test.";
  else message = "Thank you for completing the test section.";

  const stepActive = "#FBBF24";
  const stepInactive = "rgba(255,255,255,0.3)";

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: "#F8FAFC" }}>
      <div className="max-w-3xl mx-auto">
        <div
          className={`bg-white rounded-2xl overflow-hidden transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
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
              <Check className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold mb-1 relative z-10">
              {resumeMessage || header}
            </h1>
            <p className="text-sm relative z-10" style={{ color: "#BFDBFE" }}>
              {message}
            </p>

            {/* Progress dots */}
            <div className="mt-5 flex justify-center items-center gap-2 relative z-10">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    completedTest === "personality-test"
                      ? stepActive
                      : stepInactive,
                }}
              />
              <div
                className="w-6 h-0.5"
                style={{ background: stepInactive }}
              ></div>
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    completedTest === "interest-test"
                      ? stepActive
                      : stepInactive,
                }}
              />
              <div
                className="w-6 h-0.5"
                style={{ background: stepInactive }}
              ></div>
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    completedTest === "aptitude-test"
                      ? stepActive
                      : stepInactive,
                }}
              />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-5">
            <div
              className="rounded-2xl p-5"
              style={{ background: "#EFF6FF", border: "0.5px solid #DBEAFE" }}
            >
              <ThankYouPage />
            </div>

            <div className="text-center">
              <Buttons
                onClick={handleGoToNextTest}
                className="rounded-lg font-semibold px-6 py-3 text-sm md:text-base text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-md hover:shadow-lg"
                style={{ background: "#2563EB", border: "none" }}
              >
                {completedTest === "aptitude-test"
                  ? "View Results"
                  : "Continue to Next Test"}
                <ArrowRight className="w-4 h-4" />
              </Buttons>
            </div>

            {(completedTest === "personality-test" ||
              completedTest === "interest-test") && (
              <div
                className="rounded-lg p-3.5 text-center"
                style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}
              >
                <p className="text-sm italic" style={{ color: "#64748B" }}>
                  {completedTest === "personality-test" &&
                    "Great start! You're one step closer to discovering your potential."}
                  {completedTest === "interest-test" &&
                    "Excellent progress! Your interests are shaping your unique profile."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;
