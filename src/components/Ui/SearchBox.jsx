import React from "react";
import { Search } from "lucide-react";

const SearchBox = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <div className={`relative flex items-center px-2 py-2 ${className}`}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
        style={{ color: "#94A3B8" }}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 rounded-lg outline-none transition-all duration-150 text-sm"
        style={{
          border: "1px solid #E2E8F0",
          background: "white",
          color: "#0F172A",
        }}
        onFocus={(e) => {
          e.target.style.border = "1px solid #2563EB";
          e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid #E2E8F0";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
};

export default SearchBox;
