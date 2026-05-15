import React from "react";
import { Lightbulb } from "lucide-react";

const CTestThankYou = () => {
  const cardStyle = {
    background: "white",
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>
        Now we will begin the Interest Test
      </h2>
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb className="w-5 h-5" style={{ color: "#2563EB" }} />
        <h4 className="text-base font-bold" style={{ color: "#0F172A" }}>
          Important Guidelines
        </h4>
      </div>
      <div className="rounded-xl mb-4 p-4" style={cardStyle}>
        <p className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>
          ✨ No Right or Wrong Answers
        </p>
        <p className="text-sm" style={{ color: "#475569" }}>
          Imagine you have a chance to try different activities for 1 day in
          your life. For each activity displayed, share your eagerness to try it
          (Completely Like → Completely Dislike).
        </p>
      </div>
      <div className="rounded-xl p-4" style={cardStyle}>
        <p className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>
          ⏱️ Time Limit - 30 Seconds
        </p>
        <p className="text-sm" style={{ color: "#475569" }}>
          This 30-second time limit is suggested only. You should be able to
          answer in much less time. Even if you take longer, there is no issue —
          go at your own pace.
        </p>
      </div>
    </>
  );
};

export default CTestThankYou;
