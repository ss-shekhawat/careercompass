import React from "react";
import Buttons from "../Ui/Buttons";
import { CheckCircle, ArrowRight } from "lucide-react";

const AssessmentSummary = ({
  onAssessmentSubmit,
  isSubmitting,
  showConfirmModal,
  setShowConfirmModal,
  onBack,
}) => {
  return (
    <div className="max-w-3xl min-h-screen mx-auto py-10 px-4">
      <div
        className="bg-white rounded-2xl p-8 text-center"
        style={{
          border: "0.5px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div className="flex justify-center mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "#DCFCE7" }}
          >
            <CheckCircle className="w-7 h-7" style={{ color: "#15803D" }} />
          </div>
        </div>

        <h2
          className="text-xl md:text-2xl font-bold mb-2"
          style={{ color: "#0F172A" }}
        >
          Assessment Completed
        </h2>
        <p className="text-sm md:text-base mb-2" style={{ color: "#475569" }}>
          Thank you for taking this assessment.
        </p>
        <p className="text-sm md:text-base mb-6" style={{ color: "#475569" }}>
          Are you excited to know about yourself?
        </p>

        <Buttons
          onClick={onAssessmentSubmit}
          disabled={isSubmitting}
          className="rounded-lg font-semibold px-6 py-2.5 text-sm text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: isSubmitting ? "#93C5FD" : "#2563EB",
            border: "none",
          }}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Buttons>
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
                  onBack();
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
    </div>
  );
};

export default AssessmentSummary;
