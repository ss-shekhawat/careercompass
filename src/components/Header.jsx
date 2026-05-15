import PropTypes from "prop-types";
import { User, LogOut } from "lucide-react";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal";
import Buttons from "./Ui/Buttons";

export const Header = ({ title, user }) => {
  const { full_name, role, avatar_url } = user || {};
  const [open, setOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <header
      role="banner"
      className="bg-white"
      style={{ borderBottom: "1px solid #E2E8F0" }}
    >
      <div className="flex items-center justify-end h-16 px-4 md:px-6 mt-1 lg:mt-0">
        <div className="relative">
          <Buttons
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center space-x-3 focus:outline-none"
            style={{ background: "transparent", border: "none" }}
          >
            {avatar_url ? (
              <img
                src={avatar_url}
                alt={full_name}
                className="w-8 h-8 rounded-full object-cover"
                style={{ border: "1px solid #E2E8F0" }}
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#2563EB" }}
              >
                <User className="h-4 w-4 text-white" />
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-medium" style={{ color: "#0F172A" }}>
                {full_name}
              </p>
              <p
                className="text-xs font-light capitalize"
                style={{ color: "#64748B" }}
              >
                {role}
              </p>
            </div>
          </Buttons>

          {open && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setLogoutModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors hover:bg-slate-50"
                style={{
                  color: "#0F172A",
                  background: "transparent",
                  border: "none",
                }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ background: "#FEF2F2" }}
                >
                  <LogOut className="h-4 w-4" style={{ color: "#DC2626" }} />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    full_name: PropTypes.string,
    role: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
};
