import React from "react";
import { motion } from "framer-motion";
import { Compass, FlaskConical, HeartHandshake, Sparkles } from "lucide-react";

const AboutUs = () => {
  const valuePillars = [
    {
      icon: FlaskConical,
      title: "Scientific",
      description: "Evidence-based psychometric assessments",
    },
    {
      icon: HeartHandshake,
      title: "Personal",
      description: "Tailored to each student's profile",
    },
    {
      icon: Sparkles,
      title: "AI-powered",
      description: "15+ years of counsellor expertise built in",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-white">
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
              color: "#FBBF24",
              fontSize: "11px",
              letterSpacing: "1.4px",
            }}
          >
            ABOUT US
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold"
            style={{ color: "#0F172A" }}
          >
            Helping students find their true path
          </h2>
        </motion.div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-14">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "#475569" }}
            >
              At{" "}
              <span style={{ color: "#2563EB", fontWeight: 600 }}>
                CareerCompass
              </span>
              , we help students and parents discover education and career paths
              that align with the student's strengths, interests, and aptitude.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "#475569" }}
            >
              We combine scientific psychometric assessments with advanced AI to
              craft personalized career journeys — whether you're after 10th,
              12th, or preparing for JEE, NEET, CA, CLAT, UPSC or Humanities.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "#475569" }}
            >
              With our evidence-based guidance, your path is shaped by your true
              potential and long-term goals.
            </p>
          </motion.div>

          {/* Right — compass icon card with mission quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center md:justify-end"
          >
            <div
              className="rounded-2xl p-8 md:p-10 max-w-sm w-full text-center flex flex-col items-center justify-center gap-3"
              style={{ background: "#DBEAFE", aspectRatio: "1 / 1" }}
            >
              <Compass
                className="w-16 h-16 md:w-20 md:h-20"
                style={{ color: "#2563EB" }}
              />
              <p
                className="text-sm md:text-base italic leading-relaxed"
                style={{ color: "#1E40AF" }}
              >
                "Every student has a unique compass — we just help them find
                their true north."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Value pillars */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10"
          style={{ borderTop: "1px solid #E2E8F0" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-3">
                  <Icon className="w-7 h-7" style={{ color: "#2563EB" }} />
                </div>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ color: "#0F172A" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm" style={{ color: "#64748B" }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
