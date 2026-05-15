import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Buttons from "./Buttons";
import Dropdown from "./Dropdown";

export default function SelectDropdown({
  id,
  openDropdown,
  setOpenDropdown,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  getLabel,
  getValue,
  className = "",
  dropdownClass = "",
  compact = true,
}) {
  const open = openDropdown === id;

  const labelOf = (opt) =>
    getLabel ? getLabel(opt) : (opt?.label ?? opt?.name ?? String(opt));

  const valueOf = (opt) =>
    getValue ? getValue(opt) : (opt?.value ?? opt?.id ?? opt);

  const display = () => {
    if (!value) return placeholder;
    const found = options.find((o) => String(valueOf(o)) === String(value));
    return found ? labelOf(found) : value;
  };

  return (
    <div className={compact ? "relative inline-block" : "relative w-full"}>
      <Buttons
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(open ? null : id);
        }}
        className={
          compact
            ? "inline-flex items-center gap-2 border rounded-xl px-3 py-2 text-sm bg-white h-10 " +
              className
            : "w-full border p-3 rounded-lg text-left font-medium flex items-center justify-between " +
              className
        }
      >
        <span className="text-sm text-nowrap text-gray-700" style={{ fontSize: '14px' }}>{display()}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </Buttons>

      {open && (
        <div
          className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto z-50 ${dropdownClass}`}
        >
          <ul className="divide-y divide-gray-200">
            {/* <li
              className={`px-3 py-2 cursor-pointer rounded-lg ${
                !value
                  ? "primary-background white-text font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                onChange("");
                setOpenDropdown(null);
              }}
            >
              {placeholder}
            </li> */}

            {options.map((opt, i) => {
              const val = valueOf(opt);
              const label = labelOf(opt);

              return (
                <li
                  key={val ?? i}
                  className={`px-2 py-2 cursor-pointer rounded-lg text-[14px] font-medium ${
                    String(value) === String(val)
                      ? "primary-background white-text font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    onChange(val);
                    setOpenDropdown(null);
                  }}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
