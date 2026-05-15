import React from "react";
import { motion } from "framer-motion";

const Teams = () => {
  const teamMembers = [
    {
      name: "Your Name",
      role: "Founder",
      initials: "YN",
      bgColor: "#2563EB",
    },
    {
      name: "Co-Founder Name",
      role: "Co-Founder",
      initials: "CF",
      bgColor: "#FF6B6B",
    },
    {
      name: "Psychologist Name",
      role: "Psychologist",
      initials: "PN",
      bgColor: "#FBBF24",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const hoverEffect = {
    whileHover: {
      scale: 1.05,
      y: -8,
      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
    },
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
    },
  };

  return (
    <div className="mx-auto pt-4 md:pt-10">
      <motion.div
        className="text-center gray-background py-6"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="primary-color font-semibold text-xl md:text-2xl tracking-wide">
          Our Team
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl xl:mx-auto mx-2 py-4 md:py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {teamMembers.map(({ name, role, initials, bgColor }, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={hoverEffect.whileHover}
            transition={hoverEffect.transition}
            className="border rounded-lg p-14 md:p-4 text-center white-background flex flex-col items-center"
          >
            <div
              className="rounded-lg w-full h-[280px] flex items-center justify-center mb-4"
              style={{
                maxWidth: 240,
                backgroundColor: bgColor,
                color: "white",
                fontSize: "72px",
                fontWeight: 600,
                letterSpacing: "2px",
              }}
            >
              {initials}
            </div>
            <h3 className="text-base font-bold">{name}</h3>
            <p className="font-medium text-sm gray-color">{role}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Teams;
