import { useEffect, useRef } from "react";

const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
  style,
  dropdownRef,
  placement = "bottom",
  excludeRefs = [],
}) => {
  const internalRef = useRef(null);
  const ref = dropdownRef || internalRef;

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        const isOnExcluded = excludeRefs.some(
          (exRef) => exRef.current && exRef.current.contains(e.target),
        );
        if (!isOnExcluded) onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, ref, onClose]);

  if (!isOpen) return null;

  const positionClass =
    placement === "top" ? "bottom-full mb-1" : "top-full mt-1";

  return (
    <div
      ref={ref}
      className={`absolute left-0 ${positionClass} w-full rounded-xl p-1 z-50 ${className}`}
      style={{
        fontSize: "14px",
        background: "white",
        border: "1px solid #E2E8F0",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.1)",
        ...style,
      }}
      onClick={(e) => {
        if (
          e.target.tagName === "INPUT" ||
          e.target.tagName === "LABEL" ||
          e.target.tagName === "BUTTON"
        )
          return;
        onClose?.();
      }}
    >
      {children}
    </div>
  );
};

export default Dropdown;
