import { AlertTriangle } from "lucide-react";
import Buttons from "./Ui/Buttons";

const ConfirmDeleteModal = ({
  title = "Delete",
  description = "Are you sure?",
  onClose,
  onConfirm,
  disabled = false,
  confirmText = "Delete",
  loadingText = "Processing...",
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ background: "rgba(15, 23, 42, 0.6)" }}
    >
      <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-6 relative">
        <div className="flex justify-center mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#FEF2F2" }}
          >
            <AlertTriangle className="w-6 h-6" style={{ color: "#DC2626" }} />
          </div>
        </div>

        <h2
          className="text-lg font-semibold text-center mb-1"
          style={{ color: "#0F172A" }}
        >
          {title}
        </h2>
        <p className="text-sm text-center mb-6" style={{ color: "#64748B" }}>
          {description}
        </p>

        <div className="flex justify-center gap-3">
          <Buttons
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold"
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
            disabled={disabled}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
            style={{
              background: disabled ? "#FCA5A5" : "#DC2626",
              border: "none",
            }}
          >
            {disabled ? loadingText : confirmText}
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
