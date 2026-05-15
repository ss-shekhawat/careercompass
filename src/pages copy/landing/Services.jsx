import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Lightbulb,
  Users,
  Headphones,
  Clock,
  Sparkles,
  UserCheck,
  Infinity as InfinityIcon,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      step: "01",
      icon: ClipboardCheck,
      title: "Career Test",
      description:
        "Psychometric assessment covering your strengths, interests, temperament and aptitude. Parental observations included for better alignment.",
      meta: { icon: Clock, label: "30 minutes" },
      colors: {
        accent: "#2563EB",
        iconBg: "#DBEAFE",
        iconColor: "#2563EB",
        metaColor: "#2563EB",
      },
    },
    {
      step: "02",
      icon: Lightbulb,
      title: "AI Career Plan",
      description:
        "Our AI engine combines 15+ years of counsellor experience to generate your personalized education and career roadmap.",
      meta: { icon: Sparkles, label: "AI-powered" },
      colors: {
        accent: "#FBBF24",
        iconBg: "#FEF3C7",
        iconColor: "#B45309",
        metaColor: "#B45309",
      },
    },
    {
      step: "03",
      icon: Users,
      title: "Personalised Guidance",
      description:
        "1-on-1 sessions with our counsellors to discuss your AI plan, resolve queries, and finalize your decision with course and college recommendations.",
      meta: { icon: UserCheck, label: "Expert-led" },
      colors: {
        accent: "#FF6B6B",
        iconBg: "#FFE4E6",
        iconColor: "#BE123C",
        metaColor: "#BE123C",
      },
    },
    {
      step: "04",
      icon: Headphones,
      title: "Ongoing Support",
      description:
        "Continued mentoring with personal sessions, group sessions and emotional support throughout your education journey.",
      meta: { icon: InfinityIcon, label: "Lifelong access" },
      colors: {
        accent: "#15803D",
        iconBg: "#DCFCE7",
        iconColor: "#15803D",
        metaColor: "#15803D",
      },
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="services"
      className="py-16 md:py-20 lg:py-24"
      style={{ background: "#F8FAFC" }}
    >
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
            WHAT WE OFFER
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
            style={{ color: "#0F172A" }}
          >
            A complete career guidance journey
          </h2>
          <p className="text-sm md:text-base" style={{ color: "#64748B" }}>
            From discovery to lifelong support — every step covered
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const MetaIcon = service.meta.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative bg-white rounded-xl p-5 md:p-6 overflow-hidden transition-shadow"
                style={{
                  border: "0.5px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                }}
              >
                {/* Top accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "3px",
                    width: "40%",
                    background: service.colors.accent,
                  }}
                />

                {/* Icon */}
                <div
                  className="rounded-xl flex items-center justify-center mb-4"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: service.colors.iconBg,
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: service.colors.iconColor }}
                  />
                </div>

                {/* Step + Title */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    style={{
                      color: "#94A3B8",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {service.step}
                  </span>
                  <span style={{ color: "#E2E8F0" }}>·</span>
                  <h3
                    className="text-base md:text-lg font-semibold m-0"
                    style={{ color: "#0F172A" }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#64748B" }}
                >
                  {service.description}
                </p>

                {/* Meta tag */}
                <div
                  className="inline-flex items-center gap-1.5"
                  style={{
                    color: service.colors.metaColor,
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  <MetaIcon className="w-3.5 h-3.5" />
                  <span>{service.meta.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
