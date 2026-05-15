import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  X as CloseIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Buttons from "../components/Ui/Buttons";

export default function FooterSection() {
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    association: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (value !== numericValue && value.length > numericValue.length) {
        toast.warning("Please enter only numbers");
      }
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    toast.success("Thank you for joining!");
    setFormData({ name: "", email: "", phone: "", association: "" });
    setJoinModalOpen(false);
  };

  // social links needs to change
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/careermitra40/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/yourcareermitra",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/916377603809",
      label: "WhatsApp",
      isReactIcon: true,
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@YourCareerMitra",
      label: "YouTube",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/YourCareerMitra",
      label: "Facebook",
    },
  ];

  return (
    <footer
      id="contact us"
      style={{ background: "#0F172A", color: "white" }}
      className="pt-12 md:pt-16 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top section — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10 md:pb-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <img
                src="/logo-icon.svg"
                alt="CareerCompass logo"
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold leading-none">
                <span style={{ color: "white" }}>Career</span>
                <span style={{ color: "#60A5FA", marginLeft: "5px" }}>
                  Compass
                </span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-5 max-w-md text-center md:text-left mx-auto md:mx-0"
              style={{ color: "#94A3B8" }}
            >
              Career counselling and psychometric assessments for students from
              Class 9 to 12 — discover the path that fits you best.
            </p>
            <div className="flex gap-2.5 justify-center md:justify-start">
              {socialLinks.map(
                ({ icon: Icon, href, label, isReactIcon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2563EB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                    }}
                  >
                    {isReactIcon ? (
                      <Icon size={16} />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </a>
                ),
              )}
            </div>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 text-center md:text-left"
          >
            <p
              className="text-sm font-semibold mb-3"
              style={{ color: "white", letterSpacing: "0.4px" }}
            >
              Company
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#94A3B8" }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#94A3B8" }}
                >
                  Services
                </a>
              </li>
              <li>
                <button
                  onClick={() => setJoinModalOpen(true)}
                  className="text-sm transition-colors hover:text-white"
                  style={{
                    color: "#94A3B8",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  Join Us
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Legal links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 text-center md:text-left"
          >
            <p
              className="text-sm font-semibold mb-3"
              style={{ color: "white", letterSpacing: "0.4px" }}
            >
              Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#94A3B8" }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#94A3B8" }}
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-3 text-center md:text-left"
          >
            <p
              className="text-sm font-semibold mb-3"
              style={{ color: "white", letterSpacing: "0.4px" }}
            >
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:contactus@career-mitra.com"
                  className="text-sm flex items-center gap-2 justify-center md:justify-start transition-colors hover:text-white"
                  style={{ color: "#94A3B8" }}
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="break-all">
                    contact-us at careercompass@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+916377603809"
                  className="text-sm flex items-center gap-2 justify-center md:justify-start transition-colors hover:text-white"
                  style={{ color: "#94A3B8" }}
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>+91 98294 30727</span>
                </a>
              </li>
              <li
                className="text-sm flex items-start gap-2 justify-center md:justify-start"
                style={{ color: "#94A3B8" }}
              >
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jaipur, Rajasthan 302013
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-5 flex flex-col md:flex-row justify-between items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#64748B" }}>
            © {new Date().getFullYear()} CareerCompass. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#64748B" }}>
            Made with care in India
          </p>
        </div>
      </div>

      {/* Join Us modal */}
      {isJoinModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div
            className="rounded-xl shadow-2xl w-full max-w-md p-6 relative"
            style={{ background: "white", color: "#0F172A" }}
          >
            <button
              onClick={() => setJoinModalOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "#F1F5F9", color: "#475569" }}
              aria-label="Close"
            >
              <CloseIcon className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-semibold mb-2 text-center">Join Us</h2>
            <p
              className="text-sm text-center mb-5"
              style={{ color: "#64748B" }}
            >
              Want to help students and join the CareerCompass network? Share
              your details and our team will reach out.
            </p>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="rounded-lg px-3 py-2 outline-none text-sm transition-colors focus:border-blue-500"
                style={{ border: "1px solid #E2E8F0" }}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-lg px-3 py-2 outline-none text-sm transition-colors focus:border-blue-500"
                style={{ border: "1px solid #E2E8F0" }}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                inputMode="numeric"
                maxLength="10"
                className="rounded-lg px-3 py-2 outline-none text-sm transition-colors focus:border-blue-500"
                style={{ border: "1px solid #E2E8F0" }}
              />

              <select
                name="association"
                value={formData.association}
                onChange={handleInputChange}
                className="rounded-lg px-3 py-2 outline-none text-sm bg-white"
                style={{ border: "1px solid #E2E8F0" }}
              >
                <option value="">How do you want to be associated?</option>
                <option value="Counsellor">Counsellor</option>
                <option value="Employee">Employee</option>
                <option value="Other">Other</option>
              </select>

              <Buttons
                type="submit"
                className="rounded-lg py-2.5 mt-2 font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "#2563EB" }}
              >
                Submit
              </Buttons>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </footer>
  );
}
