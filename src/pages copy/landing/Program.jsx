import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Buttons from "../components/Ui/Buttons";

const Program = () => {
  const navigate = useNavigate();

  const programs = [
    {
      audience: "9th – 12th students",
      title: "Stream & Subject Selection",
      description:
        "AI-assisted assessment and personalized guidance to help you pick the right stream and subjects that lead to the right careers.",
      badgeBg: "#DBEAFE",
      badgeColor: "#1E40AF",
    },
    {
      audience: "Gap year students",
      title: "Career Selection & Planning",
      description:
        "Re-assess your education and career choices, get support in development areas, and identify alternatives aligned to your strengths.",
      badgeBg: "#FEF3C7",
      badgeColor: "#92400E",
    },
    {
      audience: "For schools",
      title: "Customized Assessment & Reports",
      description:
        "Partner with CareerCompass to assess your students and help them choose ideal streams, subjects and career goals.",
      badgeBg: "#FFE4E6",
      badgeColor: "#9F1239",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-20" style={{ background: "#F8FAFC" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="font-semibold mb-2"
            style={{
              color: "#2563EB",
              fontSize: "11px",
              letterSpacing: "1.4px",
            }}
          >
            OUR PROGRAMS
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
            style={{ color: "#0F172A" }}
          >
            Built for every stage of the journey
          </h2>
          <p className="text-sm md:text-base" style={{ color: "#64748B" }}>
            Whichever stage you're at, we have a path designed for you
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {programs.map((program, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-xl flex flex-col transition-shadow"
              style={{
                border: "0.5px solid #E2E8F0",
                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
              }}
            >
              {/* Audience badge */}
              <span
                className="inline-block self-start mb-3"
                style={{
                  background: program.badgeBg,
                  color: program.badgeColor,
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: "999px",
                  letterSpacing: "0.4px",
                }}
              >
                {program.audience}
              </span>

              {/* Title */}
              <h3
                className="text-lg md:text-xl font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                {program.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-5 flex-grow"
                style={{ color: "#64748B" }}
              >
                {program.description}
              </p>

              {/* Button */}
              <Buttons
                onClick={() => navigate("/prepayment")}
                className="rounded-lg font-semibold px-5 py-2.5 text-sm text-white inline-flex items-center justify-center gap-2 self-start transition-opacity hover:opacity-90"
                style={{ background: "#2563EB" }}
              >
                Get started
                <ArrowRight className="w-3.5 h-3.5" />
              </Buttons>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
