import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

// Utility function to show toast directly (for validation usage)
export function showToast(msg, type = "error") {
  toast[type](msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "toast-small-font",
  });
}

const ToastNotification = ({ message, type = "info" }) => {
  useEffect(() => {
    if (message) {
      toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-small-font",
      });
    }
  }, [message, type]);

  return <ToastContainer toastClassName="toast-small-font" role="alert" />;
};

ToastNotification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]).isRequired,
};

export default ToastNotification;