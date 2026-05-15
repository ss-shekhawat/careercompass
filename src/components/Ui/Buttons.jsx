import { forwardRef } from "react";
import PropTypes from "prop-types";

const Buttons = forwardRef(
  (
    {
      type = "button",
      className = "",
      textColor = "",
      style = {},
      onClick,
      onDisabledClick, // called when button is clicked while disabled
      children,
      disabled = false,
      title = "",
    },
    ref,
  ) => {
    const handleClick = (e) => {
      if (disabled) {
        if (typeof onDisabledClick === "function") onDisabledClick(e);
        return;
      }
      if (typeof onClick === "function") onClick(e);
    };

    // If a consumer provides `onDisabledClick`, allow the click to fire even when
    // `disabled` is true by not setting the native `disabled` attribute. Native
    // disabled buttons do not emit click events, so we emulate disabled state
    // visually while still receiving clicks.
    const shouldSetNativeDisabled = disabled && !onDisabledClick;

    return (
      <button
        ref={ref}
        type={type}
        title={title}
        style={style}
        className={`p-2 rounded ${textColor} ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handleClick}
        disabled={shouldSetNativeDisabled}
        aria-disabled={disabled}
        role="button"
        aria-label={title || undefined}
      >
        {children}
      </button>
    );
  },
);

Buttons.displayName = "Buttons";

Buttons.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  textColor: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default Buttons;
