import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sentences } from "../data/content";

const PostSignupInstructions = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index < sentences.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        // navigate("/profile-questions");
        navigate("/student/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [index, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={sentences[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-gray-700 text-lg animate-fade-in transition-all duration-700"
          >
            {sentences[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PostSignupInstructions;
