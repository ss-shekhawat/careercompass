import React from "react";
import { CheckCircle } from "lucide-react";
import Buttons from "../Ui/Buttons";

const ValidationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(15, 23, 42, 0.6)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "#DCFCE7" }}
        >
          <CheckCircle className="h-7 w-7" style={{ color: "#15803D" }} />
        </div>

        <p className="mb-6 text-sm md:text-base" style={{ color: "#475569" }}>
          Your report has been confirmed and is ready for download.
        </p>

        <div className="flex justify-center gap-3">
          <Buttons
            onClick={onClose}
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
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "#2563EB", border: "none" }}
          >
            Confirm
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
