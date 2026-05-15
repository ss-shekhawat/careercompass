import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, X as CloseIcon } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import Buttons from "../../components/Ui/Buttons";

const Demo = () => {
  const [showModal, setShowModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [form, setForm] = useState({
    name: "",
    standard: "",
    phone: "",
    email: "",
  });

  const YOUTUBE_DEMO_URL = "";

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDemoClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowThankYou(false);
    setForm({ name: "", standard: "", phone: "", email: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    // API call goes here when ready
  };

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <motion.div
        className="max-w-5xl mx-auto rounded-2xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-6 md:px-12 py-10 md:py-14 text-center">
          {/* Badge */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#FBBF24",
                letterSpacing: "0.6px",
              }}
            >
              READY TO START?
            </span>
          </motion.div>

          {/* Heading */}
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
            style={{ color: "white", lineHeight: 1.25 }}
          >
            Take the first step towards career clarity
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm md:text-base mb-8 max-w-xl mx-auto"
            style={{ color: "#BFDBFE" }}
          >
            Book a free demo and see how CareerCompass can help your child
            discover their best-fit career.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Buttons
              onClick={handleDemoClick}
              className="rounded-lg font-semibold px-6 py-3 text-sm md:text-base text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 shadow-lg hover:shadow-xl"
              style={{ background: "#FF6B6B", border: "none" }}
            >
              Book Free Demo
              <ArrowRight className="w-4 h-4" />
            </Buttons>

            <a
              href={YOUTUBE_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg font-semibold px-6 py-3 text-sm md:text-base inline-flex items-center justify-center gap-2 transition-all duration-150 hover:bg-white/10"
              style={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                textDecoration: "none",
              }}
            >
              <FaYoutube className="w-4 h-4" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div
            className="rounded-xl shadow-2xl w-full max-w-md p-6 relative"
            style={{ background: "white", color: "#0F172A" }}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "#F1F5F9", color: "#475569" }}
              aria-label="Close"
            >
              <CloseIcon className="w-4 h-4" />
            </button>

            {!showThankYou ? (
              <>
                <h3
                  className="text-xl font-semibold mb-2 text-center"
                  style={{ color: "#0F172A" }}
                >
                  Book your free demo
                </h3>
                <p
                  className="text-sm text-center mb-5"
                  style={{ color: "#64748B" }}
                >
                  Share your details and our team will reach out shortly.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="rounded-lg px-3 py-2.5 outline-none text-sm"
                    style={{ border: "1px solid #E2E8F0" }}
                  />
                  <input
                    type="text"
                    name="standard"
                    value={form.standard}
                    onChange={handleInputChange}
                    placeholder="Standard / Class"
                    required
                    className="rounded-lg px-3 py-2.5 outline-none text-sm"
                    style={{ border: "1px solid #E2E8F0" }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    maxLength="10"
                    className="rounded-lg px-3 py-2.5 outline-none text-sm"
                    style={{ border: "1px solid #E2E8F0" }}
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="rounded-lg px-3 py-2.5 outline-none text-sm"
                    style={{ border: "1px solid #E2E8F0" }}
                  />

                  <button
                    type="submit"
                    className="rounded-lg py-2.5 mt-2 font-semibold text-sm text-white transition-opacity hover:opacity-90 inline-flex items-center justify-center gap-2"
                    style={{ background: "#2563EB", border: "none" }}
                  >
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ background: "#DCFCE7" }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#0F172A" }}
                >
                  Thank you!
                </h3>
                <p className="text-sm mb-5" style={{ color: "#64748B" }}>
                  Our team will connect with you on the email you provided.
                </p>
                <a
                  href={YOUTUBE_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 transition-opacity hover:opacity-90"
                  style={{
                    background: "#FF6B6B",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Youtube className="w-4 h-4" />
                  Watch Demo on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Demo;
