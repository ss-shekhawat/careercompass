import Buttons from "../../components/Ui/Buttons";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Clock,
  UserCheck,
} from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.userInfo);

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

  const handleDemoClick = () => {
    const servicesEl = document.getElementById("services");
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trustPillars = [
    { icon: ShieldCheck, label: "Scientifically validated" },
    { icon: Clock, label: "30-minute assessment" },
    { icon: UserCheck, label: "Expert counsellors" },
  ];

  return (
    <>
      <Helmet>
        <title>
          CareerCompass | Career Counselling & Psychometric Tests for Class 9–12
        </title>
        <meta
          name="description"
          content="Find your ideal career with CareerCompass — AI-driven assessments and expert guidance for students in Class 9, 10, 11, 12 and beyond. Choose the right stream, course and career."
        />
        <meta
          name="keywords"
          content="Career counselling for students, Best career assessment test India, AI career guidance platform, Personalized career roadmap, Aptitude and interest test for students, Online career guidance for teenagers, How to choose the right stream after 10th, Stream selection after 12th"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="primary-background w-full" style={{ minHeight: "85dvh" }}>
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Left side — text content */}
          <div className="text-center md:text-left md:w-1/2 flex flex-col justify-center">
            {/* Audience badge */}
            <div className="mb-4 md:mb-5">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#FBBF24",
                  letterSpacing: "0.6px",
                }}
              >
                CLASS 9 – 12 CAREER GUIDANCE
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold white-text mb-4 md:mb-5 leading-tight">
              Confused about which subjects to choose after school?
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 font-normal max-w-lg mx-auto md:mx-0">
              Take our scientifically-designed career assessment and discover
              the path that fits you best.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
              <Buttons
                onClick={handleClick}
                className="secondary-background white-text rounded-lg font-semibold px-6 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/50 border-none active:scale-95 transition-transform duration-150 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Buttons>

              <button
                onClick={handleDemoClick}
                className="rounded-lg font-semibold px-6 py-3 text-sm sm:text-base white-text inline-flex items-center justify-center gap-2 transition-all duration-150 hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "transparent",
                }}
              >
                <PlayCircle className="w-4 h-4" />
                Watch Demo
              </button>
            </div>

            {/* Trust pillars */}
            <div
              className="pt-5 mt-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
            >
              <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center md:justify-start">
                {trustPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white/90 text-xs md:text-sm"
                    >
                      <Icon className="w-4 h-4" style={{ color: "#FBBF24" }} />
                      <span>{pillar.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side — illustration placeholder */}
          <div className="md:w-1/2 flex justify-center items-center w-full">
            <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center">
              <img
                src="/hero-illustration.svg"
                alt="Student deciding their career path"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
