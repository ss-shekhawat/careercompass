import React from "react";
import { Target, Brain } from "lucide-react";

const ATestThankYou = () => {
  const cardStyle = {
    background: "white",
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>
        Assessment Complete!
      </h2>

      <div className="flex items-center gap-3 mb-2">
        <Target className="w-5 h-5" style={{ color: "#2563EB" }} />
        <h4 className="text-base font-bold" style={{ color: "#0F172A" }}>
          What You Completed
        </h4>
      </div>
      <div className="rounded-xl mb-4 p-4" style={cardStyle}>
        <p className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>
          🎯 Aptitude Test
        </p>
        <p className="text-sm" style={{ color: "#475569" }}>
          You successfully finished all three sections – <b>Numerical</b>,{" "}
          <b>Verbal</b> &amp; <b>Logical</b>. Each section tested your
          problem-solving, reasoning, and analytical skills.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Brain className="w-5 h-5" style={{ color: "#2563EB" }} />
        <h4 className="text-base font-bold" style={{ color: "#0F172A" }}>
          Next Step
        </h4>
      </div>
      <div className="rounded-xl p-4" style={cardStyle}>
        <p className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>
          📑 Report Generation
        </p>
        <p className="text-sm" style={{ color: "#475569" }}>
          Your responses have been recorded. A personalized career guidance
          report will be generated based on all your test performances.
        </p>
      </div>
    </>
  );
};

export default ATestThankYou;
