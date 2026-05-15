import React from "react";
import { Target } from "lucide-react";

const ITestThankYou = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>
        Now we will begin the Aptitude Test
      </h2>
      <div className="flex items-center gap-3 mb-2">
        <Target className="w-5 h-5" style={{ color: "#2563EB" }} />
        <h4 className="text-base font-bold" style={{ color: "#0F172A" }}>
          Important Details
        </h4>
      </div>
      <div
        className="rounded-xl mb-4 p-4"
        style={{
          background: "white",
          border: "0.5px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
        }}
      >
        <p className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>
          📘 Question Types
        </p>
        <p className="text-sm" style={{ color: "#475569" }}>
          The test will have three types of questions – <b>Numerical</b>,{" "}
          <b>Verbal</b> &amp; <b>Logical</b>. Each will have four options.
          Select 1 of the 4 choices.
        </p>
      </div>
      <div
        className="rounded-xl p-4"
        style={{
          background: "white",
          border: "0.5px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
        }}
      >
        <p className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>
          ✅ Right and Wrong Answers
        </p>
        <p className="text-sm" style={{ color: "#475569" }}>
          Remember these are Aptitude questions which{" "}
          <span className="font-bold">DO have right and wrong answers.</span>{" "}
          Hence read each question carefully and then select the correct answer.
        </p>
        <p className="text-sm mt-2" style={{ color: "#475569" }}>
          ⏱️ <span className="font-semibold">Time Limit – 90 sec.</span>{" "}
          Suggested only. Even if you take longer, it's fine.
        </p>
      </div>
    </>
  );
};

export default ITestThankYou;
