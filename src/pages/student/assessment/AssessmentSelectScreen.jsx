import React from "react";
import { availableAssessments } from "../../../data/content";

const AssessmentSelectScreen = ({ onSelectAssessment }) => {
  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <div className="max-w-6xl mx-auto py-0">
      <div className="bg-white rounded-2xl p-6 sm:p-8" style={cardStyle}>
        <div className="text-center md:text-left mb-6">
          <h2
            className="text-xl md:text-2xl font-bold mb-1"
            style={{ color: "#0F172A" }}
          >
            Select Assessment
          </h2>
          <p className="text-sm md:text-base" style={{ color: "#64748B" }}>
            Choose the assessment you want to take
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {availableAssessments.map((assessment) => (
            <div
              key={assessment.id}
              onClick={() => onSelectAssessment(assessment)}
              className="cursor-pointer rounded-lg p-5 transition-all duration-200 text-center md:text-left"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#EFF6FF";
                e.currentTarget.style.borderColor = "#2563EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F8FAFC";
                e.currentTarget.style.borderColor = "#E2E8F0";
              }}
            >
              <h4 className="font-bold text-base" style={{ color: "#2563EB" }}>
                {assessment.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentSelectScreen;
