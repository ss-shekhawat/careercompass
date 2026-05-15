import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogoutUserMutation, authApi } from "../redux/services/authApi";
import { assessmentApi } from "../redux/services/assessmentApi";
import {
  startLogout,
  userLogout,
} from "../redux/reducers/userInfo/userInfoSlice";
import Buttons from "./Ui/Buttons";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";
import { persistor } from "../redux/store";

const LogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.userInfo);
  const [logout, { isLoading }] = useLogoutUserMutation();
  const { handleError } = useApiErrorHandling();
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) modalRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    dispatch(startLogout());
    try {
      await logout().unwrap();
    } catch (err) {
      handleError(err);
    }
    dispatch(authApi.util.resetApiState());
    dispatch(assessmentApi.util.resetApiState());
    dispatch(userLogout());
    await persistor.purge();
    navigate("/", { replace: true });
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(15, 23, 42, 0.6)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#FEF2F2" }}
          >
            <LogOut className="w-6 h-6" style={{ color: "#DC2626" }} />
          </div>
        </div>

        <h2
          id="logout-modal-title"
          className="text-lg font-semibold text-center mb-1"
          style={{ color: "#0F172A" }}
        >
          Logout?
        </h2>
        <p className="text-sm text-center mb-5" style={{ color: "#64748B" }}>
          You'll need to sign in again to access your dashboard.
        </p>

        <div className="flex justify-center gap-3">
          <Buttons
            onClick={onClose}
            disabled={isLoading}
            className="text-sm px-5 py-2.5 rounded-lg font-semibold"
            style={{
              border: "1px solid #E2E8F0",
              color: "#475569",
              background: "white",
            }}
          >
            Cancel
          </Buttons>
          <Buttons
            onClick={handleLogout}
            disabled={isLoading}
            className="text-sm px-5 py-2.5 rounded-lg font-semibold text-white"
            style={{
              background: isLoading ? "#FCA5A5" : "#DC2626",
              border: "none",
            }}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Buttons>
        </div>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LogoutModal;
