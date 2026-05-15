import React, { useState } from "react";
import StudentLayout from "../../../components/StudentLayout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Buttons from "../../../components/Ui/Buttons";

const AssessmentSummaryScreen = ({ handleBack }) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto py-0">
        <div className="mb-5">
          <Buttons
            onClick={() => setShowConfirmModal(true)}
            className="text-sm font-semibold rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5"
            style={{
              color: "#2563EB",
              background: "transparent",
              border: "none",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Buttons>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8" style={cardStyle}>
          <h2
            className="text-xl md:text-2xl font-bold mb-3"
            style={{ color: "#0F172A" }}
          >
            Assessment Summary
          </h2>
          <p className="text-sm md:text-base mb-4" style={{ color: "#475569" }}>
            You have completed all tests. Review your answers below.
          </p>

          <div className="text-center mt-8">
            <Buttons
              onClick={() => navigate("/student/report")}
              className="rounded-lg font-semibold px-6 py-2.5 text-sm text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow-md"
              style={{ background: "#2563EB", border: "none" }}
            >
              Submit and View Report
              <ArrowRight className="w-4 h-4" />
            </Buttons>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: "rgba(15, 23, 42, 0.6)" }}
        >
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#0F172A" }}
            >
              Are you sure you want to go back?
            </h3>
            <div className="flex justify-center gap-3">
              <Buttons
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2 rounded-lg text-sm font-semibold"
                style={{
                  border: "1px solid #E2E8F0",
                  color: "#475569",
                  background: "white",
                }}
              >
                Cancel
              </Buttons>
              <Buttons
                onClick={() => {
                  setShowConfirmModal(false);
                  handleBack();
                }}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ background: "#2563EB", border: "none" }}
              >
                Yes
              </Buttons>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default AssessmentSummaryScreen;
