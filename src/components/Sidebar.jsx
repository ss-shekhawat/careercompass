import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import {
  Home,
  BarChart3,
  ClipboardList,
  School,
  User,
  AlertCircle,
  Menu,
  X,
  FileText,
  CalendarClock,
  CreditCard,
  Notebook,
  Package,
} from "lucide-react";
import { TbUsers } from "react-icons/tb";
import { FiUserCheck } from "react-icons/fi";
import { HiOutlineTag } from "react-icons/hi";
import Buttons from "../components/Ui/Buttons";
import { useSelector } from "react-redux";
import { ADMIN_PERMISSION_MAP } from "../../src/data/content";

const Sidebar = ({ userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const permissions = useSelector((state) => state.userInfo.permissions || []);

  const navigation = {
    admin: [
      { name: "Dashboard", href: "/admin/dashboard", icon: Home },
      { name: "Entity Management", href: "/admin/entity", icon: School },
      {
        name: "Promo Code",
        href: "/admin/promo-code",
        icon: HiOutlineTag,
        matchPaths: ["/admin/promo-code", "/admin/promo-code-usage/:promoId"],
      },
      { name: "Test Management", href: "/admin/tests", icon: FileText },
      {
        name: "Question Management",
        href: "/admin/question-management-list",
        icon: ClipboardList,
        matchPaths: [
          "/admin/question-management-list",
          "/admin/question-management",
          "/admin/add-question-section",
        ],
      },
      {
        name: "Report Management",
        href: "/admin/reports",
        icon: BarChart3,
        matchPaths: ["/admin/reports", "/admin/report/:id", "/admin/no-report"],
      },
      {
        name: "Counsellor Management",
        href: "/admin/counsellor-management",
        icon: TbUsers,
        matchPaths: [
          "/admin/counsellor-management",
          "/admin/student-handled",
          "/admin/student-handled/:id",
          "/admin/student-audit-report",
          "/admin/no-report",
        ],
      },
      {
        name: "User and Permission Management",
        href: "/admin/users-management",
        icon: FiUserCheck,
        matchPaths: ["/admin/users-management", "/admin/add-user"],
      },
      { name: "Payment Management", href: "/admin/payments", icon: CreditCard },
      {
        name: "Product Management",
        href: "/admin/product",
        icon: Package,
        activePaths: ["/admin/product", "/admin/testimonials"],
      },
      { name: "Support Tickets", href: "/admin/issues", icon: AlertCircle },
    ],
    student: [
      { name: "Dashboard", href: "/student/dashboard", icon: Home },
      { name: "Report", href: "/student/report", icon: BarChart3 },
      { name: "Profile", href: "/student/profile", icon: User },
      { name: "Booking", href: "/student/booking", icon: Notebook },
      { name: "My Services", href: "/student/subscription", icon: CreditCard },
    ],
    counsellor: [
      { name: "Dashboard", href: "/counsellor/dashboard", icon: Home },
      {
        name: "Report Management",
        href: "/counsellor/report",
        icon: FileText,
        matchPaths: [
          "/counsellor/report",
          "/counsellor/student-profile",
          "/counsellor/student-profile-questions",
          "/counsellor/parent-profile-questions",
          "/counsellor/student-result",
        ],
      },
      {
        name: "Slot Management",
        href: "/counsellor/slot",
        icon: CalendarClock,
      },
      { name: "My Slots", href: "/counsellor/slot-time", icon: Home },
    ],
  };

  let navItems = navigation[userType] || [];
  if (
    userType === "admin" &&
    Array.isArray(permissions) &&
    permissions.length
  ) {
    navItems = navItems.filter((item) => {
      const permName = ADMIN_PERMISSION_MAP[item.name] || item.name;
      return permissions.includes(permName);
    });
  }

  useEffect(() => {
    if (
      userType === "admin" &&
      Array.isArray(permissions) &&
      permissions.length
    ) {
      const isCurrentPagePermitted = navItems.some((item) => {
        if (item.matchPaths?.length) {
          return item.matchPaths.some((pattern) =>
            matchPath({ path: pattern, end: false }, location.pathname),
          );
        }
        return matchPath({ path: item.href, end: false }, location.pathname);
      });
      if (!isCurrentPagePermitted && navItems.length > 0) {
        navigate(navItems[0].href);
      }
    }
  }, [userType, permissions, location.pathname, navItems, navigate]);

  const isActive = (item) => {
    const pathname = location.pathname;
    if (item.matchPaths?.length) {
      return item.matchPaths.some((pattern) =>
        matchPath({ path: pattern, end: false }, pathname),
      );
    }
    return matchPath({ path: item.href, end: false }, pathname);
  };

  const linkBase =
    "flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-150";
  const activeStyle = {
    background: "#EFF6FF",
    color: "#2563EB",
    borderRight: "2px solid #2563EB",
  };
  const inactiveStyle = { color: "#475569", background: "transparent" };

  const renderNavItem = (item, onClick) => (
    <Link
      key={item.name}
      to={item.href}
      onClick={onClick}
      className={linkBase}
      style={isActive(item) ? activeStyle : inactiveStyle}
      role="menuitem"
      tabIndex={0}
      onMouseEnter={(e) => {
        if (!isActive(item)) {
          e.currentTarget.style.background = "#F8FAFC";
          e.currentTarget.style.color = "#0F172A";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive(item)) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#475569";
        }
      }}
    >
      <item.icon className="h-5 w-5" />
      <span className="text-sm">{item.name}</span>
    </Link>
  );

  const BrandHeader = () => (
    <div
      className="flex items-center h-16 px-4"
      style={{ borderBottom: "1px solid #E2E8F0" }}
    >
      <Link to="/" className="inline-flex items-center gap-2">
        <img src="/logo-icon.svg" alt="CareerCompass" className="w-8 h-8" />
        <span className="text-base font-semibold leading-none">
          <span style={{ color: "#0F172A" }}>Career</span>
          <span style={{ color: "#2563EB", marginLeft: "4px" }}>Compass</span>
        </span>
      </Link>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0"
          style={{ background: "rgba(15, 23, 42, 0.6)" }}
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-60 bg-white shadow-xl flex flex-col">
          <div
            className="flex h-16 items-center justify-between px-4"
            style={{ borderBottom: "1px solid #E2E8F0" }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2"
              onClick={() => setSidebarOpen(false)}
            >
              <img
                src="/logo-icon.svg"
                alt="CareerCompass"
                className="w-8 h-8"
              />
              <span className="text-base font-semibold leading-none">
                <span style={{ color: "#0F172A" }}>Career</span>
                <span style={{ color: "#2563EB", marginLeft: "4px" }}>
                  Compass
                </span>
              </span>
            </Link>
            <Buttons
              onClick={() => setSidebarOpen(false)}
              style={{ background: "transparent", border: "none" }}
            >
              <X className="h-5 w-5" style={{ color: "#64748B" }} />
            </Buttons>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1" role="navigation">
            {navItems.map((item) =>
              renderNavItem(item, () => setSidebarOpen(false)),
            )}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col bg-white"
        style={{ borderRight: "1px solid #E2E8F0" }}
      >
        <BrandHeader />
        <nav className="flex-1 px-3 py-4 space-y-1" role="navigation">
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </div>

      {/* Mobile menu button */}
      <Buttons
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-md fixed top-4 left-4 z-50 bg-white shadow-sm"
        style={{ color: "#475569", border: "1px solid #E2E8F0" }}
      >
        <Menu className="h-5 w-5" />
      </Buttons>
    </>
  );
};

export default Sidebar;
