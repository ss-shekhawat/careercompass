import React, { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";

const CommonSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null); // 👈 ref on the container, not just the button

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ... getLabel stays the same

  return (
    <div className="relative" ref={containerRef}> {/* 👈 attach ref here */}
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm white-background text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        onClick={() => setIsOpen((v) => !v)}
      >
        {/* ... rest unchanged */}
      </button>
      <Dropdown isOpen={isOpen} className="w-full left-2 -translate-x-0 mt-2" excludeRefs={[containerRef]}>
        {/* ... rest unchanged */}
      </Dropdown>
    </div>
  );
};

export default CommonSelect;
