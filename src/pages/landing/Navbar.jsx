import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut, LayoutDashboard } from "lucide-react";
import Buttons from "../../components/Ui/Buttons";
import { userLogout } from "../../redux/reducers/userInfo/userInfoSlice";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.userInfo);

  // Logged-in check that handles role being either a string or array

  const isLoggedIn = Boolean(token && user);
  const roles = isLoggedIn
    ? Array.isArray(user.role)
      ? user.role
      : [user.role]
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleGetStarted = () => {
    if (isLoggedIn && roles.includes("students")) {
      navigate("/student/dashboard");
      return;
    }

    navigate("/prepayment");
  };
  const goToDashboard = () => {
    if (roles.includes("admin") || roles.includes("super_admin")) {
      navigate("/admin/dashborad");
    } else if (roles.includes("counsellor")) {
      navigate("counsellor/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem(authToken); // belt - and- suspenders
    navigate("/");
  };

  return (
    <div
      className={`flex justify-between items-center px-4 md:px-18 lg:px-20 py-3 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "white-background shadow-lg" : "white-background"
      }`}
    >
      {/* Logo — ) */}
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src="/logo-icon.svg"
          alt="CareerCompass logo"
          className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain"
        />
        <span className="text-xl md:text-xl lg:text-2xl font-semibold leading-none">
          <span className="black-text">Career</span>
          <span className="primary-color ml-1.5">Compass</span>
        </span>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Buttons onClick={toggleMenu} className="text-2xl primary-color">
          ☰
        </Buttons>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 white-background shadow-xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 border-b">
          <Buttons onClick={toggleMenu} className="text-2xl primary-color">
            ×
          </Buttons>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          <a
            href="/"
            className="p-3 primary-color rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#services"
            className="p-3 primary-color rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#about"
            className="p-3 primary-color rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </a>
          <a
            href="#contact us"
            className="p-3 primary-color rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </a>
          <button
            onClick={() => {
              handleGetStarted();
              setIsMenuOpen(false);
            }}
            className="p-3 primary-color rounded-lg text-left"
          >
            Get Started
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  goToDashboard();
                  setIsMenuOpen(false);
                }}
                className="p-3 primary-color rounded-lg text-left"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="p-3 primary-color rounded-lg text-left text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogin();
                setIsMenuOpen(false);
              }}
              className="p-3 primary-color rounded-lg text-left"
            >
              Login
            </button>
          )}
        </nav>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 md:gap-6 lg:gap-8 items-center lg:ml-16">
        <Link
          to="/"
          className="primary-color font-semibold text-base"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </Link>

        <a href="#services" className="primary-color font-semibold text-base">
          Services
        </a>

        <a href="#about" className="primary-color font-semibold text-base">
          About Us
        </a>

        <a href="#contact us" className="primary-color font-semibold text-base">
          Contact Us
        </a>
      </div>

      {/* Desktop right side — Login OR Dashboard+Logout */}
      <div className="hidden md:flex items-center gap-2 xl:mr-14">
        {isLoggedIn ? (
          <>
            <span className="primary-color font-medium text-sm hidden lg:inline-block mr-2">
              Hi, {user.full_name?.split(" ")[0] || "there"}
            </span>
            <Buttons
              onClick={goToDashboard}
              className="secondary-background white-text rounded-full font-semibold px-4 py-2 text-sm border-none"
            >
              <LayoutDashboard className="w-4 h-4 mr-2 text-white inline-block" />
              Dashboard
            </Buttons>
            <Buttons
              onClick={handleLogout}
              className="rounded-full font-semibold px-4 py-2 text-sm border border-red-500 text-red-600 bg-white hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2 inline-block" />
              Logout
            </Buttons>
          </>
        ) : (
          <Buttons
            onClick={handleLogin}
            className="secondary-background white-text rounded-full font-semibold px-6 py-2 text-sm border-none"
          >
            Login
            <LogIn className="w-4 h-4 ml-2 text-white inline-block" />
          </Buttons>
        )}
      </div>
    </div>
  );
};

export default Navbar;
