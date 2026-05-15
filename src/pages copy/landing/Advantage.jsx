import React from "react";
import { motion } from "framer-motion";
import { FlaskConical, Award, Target, Route } from "lucide-react";

const Advantage = () => {
  const advantages = [
    {
      icon: FlaskConical,
      title: "Scientific Guidance",
      description:
        "Proven psychometric tests customized for the Indian education system and work environment.",
      iconBg: "#DBEAFE",
      iconColor: "#2563EB",
    },
    {
      icon: Award,
      title: "Expert-Led",
      description:
        "Built on 15+ years and 15,000+ students of senior psychologist counselling experience.",
      iconBg: "#FEF3C7",
      iconColor: "#B45309",
    },
    {
      icon: Target,
      title: "Strength-Based",
      description:
        "We help you play to your strengths instead of following the rat race or chasing quick fixes.",
      iconBg: "#FFE4E6",
      iconColor: "#BE123C",
    },
    {
      icon: Route,
      title: "High School to College",
      description:
        "Continued counsellor and mentor access throughout your education journey, not just one assessment.",
      iconBg: "#DCFCE7",
      iconColor: "#15803D",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-20 bg-white">
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
            WHY CHOOSE US
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
            style={{ color: "#0F172A" }}
          >
            The CareerCompass advantage
          </h2>
          <p className="text-sm md:text-base" style={{ color: "#64748B" }}>
            What makes us different from the rest
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="flex gap-4 p-5 rounded-xl transition-shadow"
                style={{
                  background: "#F8FAFC",
                  border: "0.5px solid #E2E8F0",
                }}
              >
                {/* Icon */}
                <div
                  className="rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: adv.iconBg,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: adv.iconColor }} />
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="text-base md:text-lg font-semibold mb-1.5"
                    style={{ color: "#0F172A" }}
                  >
                    {adv.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#64748B" }}
                  >
                    {adv.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantage;
