import { useState, useEffect } from "react";
import { Tag, X } from "lucide-react";
import Buttons from "./Buttons";

export default function PromoCodePopup({
  onApply,
  onSkip,
  isOpen,
  initialPromo = "",
  serverError = "",
}) {
  const [promo, setPromo] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      setPromo(initialPromo || "");
      setError(serverError || "");
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!promo.trim()) {
      setError("Please enter a promo code or choose Skip.");
      return;
    }
    setError("");
    onApply && onApply(promo.trim());
  };

  const handleOverlayClick = () => {
    setVisible(false);
    setTimeout(() => onSkip && onSkip(), 180);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${visible ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div
        className="absolute inset-0 transition-colors duration-150"
        style={{
          background: visible ? "rgba(15, 23, 42, 0.6)" : "transparent",
        }}
      />

      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all duration-180 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center"
              style={{ background: "#FEF3C7" }}
            >
              <Tag className="h-6 w-6" style={{ color: "#B45309" }} />
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#0F172A" }}
              >
                Have a promo code?
              </h3>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Enter your code to redeem discounts, or skip to continue.
              </p>
            </div>
          </div>

          <button
            aria-label="Close promo dialog"
            className="p-1 rounded-full bg-transparent border-none cursor-pointer"
            style={{ color: "#94A3B8" }}
            onClick={handleOverlayClick}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleApply} className="mt-5">
          <label htmlFor="promo" className="sr-only">
            Promo code
          </label>
          <div className="relative">
            <input
              id="promo"
              name="promo"
              autoComplete="off"
              autoFocus
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="e.g. STUDENT10"
              className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-150"
              style={{
                border: error ? "1px solid #FECACA" : "1px solid #E2E8F0",
                background: "white",
                color: "#0F172A",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #2563EB";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.border = error
                  ? "1px solid #FECACA"
                  : "1px solid #E2E8F0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error ? (
            <p className="text-sm mt-2" style={{ color: "#DC2626" }}>
              {error}
            </p>
          ) : (
            <p className="text-sm mt-2" style={{ color: "#94A3B8" }}>
              Promo codes are case-insensitive. One code per transaction.
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <Buttons
              type="submit"
              className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-white"
              style={{ background: "#2563EB", border: "none" }}
              onClick={handleApply}
            >
              Apply
            </Buttons>

            <Buttons
              type="button"
              className="flex-1 py-2.5 rounded-lg font-semibold text-sm"
              style={{
                border: "1px solid #E2E8F0",
                background: "white",
                color: "#475569",
              }}
              onClick={handleOverlayClick}
            >
              Skip
            </Buttons>
          </div>
        </form>
      </div>
    </div>
  );
}
