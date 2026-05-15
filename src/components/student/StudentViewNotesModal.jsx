import React from "react";
import { X, FileText } from "lucide-react";
import Buttons from "../Ui/Buttons";

const StudentViewNotesModal = ({ isOpen, onClose, studentId }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-0"
      style={{ background: "rgba(15, 23, 42, 0.6)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-[95%] max-w-[600px]">
        <div
          className="flex items-center justify-between px-5 pt-4 pb-3"
          style={{ borderBottom: "1px solid #E2E8F0" }}
        >
          <h2
            className="text-base md:text-lg font-semibold"
            style={{ color: "#0F172A" }}
          >
            Counsellor Notes
          </h2>
          <Buttons
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "#F1F5F9", color: "#475569", border: "none" }}
          >
            <X size={16} />
          </Buttons>
        </div>

        <div className="px-5 py-10 text-center">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{ background: "#F1F5F9" }}
          >
            <FileText className="w-6 h-6" style={{ color: "#94A3B8" }} />
          </div>
          <h3
            className="text-base font-semibold mb-1"
            style={{ color: "#0F172A" }}
          >
            Notes Coming Soon
          </h3>
          <p className="text-sm" style={{ color: "#64748B" }}>
            Once counsellor sessions launch, your notes from sessions will
            appear here.
          </p>
        </div>

        <div
          className="flex justify-end gap-3 px-5 py-3"
          style={{ borderTop: "1px solid #E2E8F0" }}
        >
          <Buttons
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold"
            style={{
              border: "1px solid #E2E8F0",
              color: "#475569",
              background: "white",
            }}
          >
            Close
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default StudentViewNotesModal;
