import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../../components/Ui/Buttons";
import { useSelector } from "react-redux";
import { LogIn } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClick = () => {
    if (token && user) {
      const roles = Array.isArray(user.role) ? user.role : [user.role];

      if (roles.includes("student")) {
        navigate("/student/dashboard");
        return;
      }
    }

    navigate("/prepayment");
  };
  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div
      className={`flex justify-between items-center px-4 md:px-18 lg:px-20 py-3 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "white-background shadow-lg" : "white-background"
      }`}
    >
      {/* Logo — Version B: Split (icon SVG + text rendered with React) */}
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
        <nav className="flex flex-col p-4">
          {[
            { href: "/", label: "Home" },
            { href: "#services", label: "Services" },
            { href: "#about", label: "About Us" },
            { href: "#contact us", label: "Contact Us" },
            { label: "Get Started", action: handleClick },
          ].map((item, idx) =>
            item.action ? (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setIsMenuOpen(false);
                }}
                className="p-3 primary-color rounded-lg text-left"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={idx}
                href={item.href}
                className="p-3 primary-color rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ),
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

      <div className="hidden md:flex xl:mr-14">
        <Buttons
          onClick={handleNavigate}
          className="secondary-background white-text rounded-full font-semibold px-6 py-2 text-sm outline-none focus:ring-1 border-none"
        >
          Login
          <LogIn className="w-4 h-4 ml-2 mr-2 text-white inline-block" />
        </Buttons>
      </div>
    </div>
  );
};

export default Navbar;
