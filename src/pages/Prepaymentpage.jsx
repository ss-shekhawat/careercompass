import {
  ArrowLeft,
  ArrowRight,
  LogIn,
  X,
  ShieldCheck,
  Sparkles,
  UserCheck,
  FlaskConical,
  Lightbulb,
  Flag,
  Eye,
  ClipboardCheck,
  FileText,
  Route,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PromoCodePopup from "../components/Ui/PromoCodePopup";
import { useGetPublicProductsQuery } from "../redux/services/entityApi";
import {
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
} from "../redux/services/paymentApi";
import { getApiErrorMessage } from "../utils/apiError";
import { loadRazorpayScript } from "../utils/razorpay";

import { FAQs, steps, stepTwoThree } from "../data/content";

function Prepaymentpage() {
  /* ─── UI state ─── */
  const [openFAQ, setOpenFAQ] = useState(null);
  const [modalText, setModalText] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  /* ─── Plan / payment state ─── */
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);
  const [expandedPlanFeatures, setExpandedPlanFeatures] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [initialPromoValue, setInitialPromoValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* ─── Redux / API ─── */
  const { data: products = [], isLoading: productsLoading } =
    useGetPublicProductsQuery();
  const [initiatePayment] = useInitiatePaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const { isLoggedIn } = useSelector((state) => state.userInfo);

  /* ─── Helper: map raw API product → UI plan shape ─── */
  const mapProduct = (p) => ({
    id: p.product_id || p.productId || p.id,
    name: p.name || p.product_name || "Untitled Plan",
    description: p.description || "",
    type: p.internal_code || p.type || "",
    price:
      p.discounted_price || p.discountedPrice || p.discounted || p.price || 0,
    originalPrice: p.original_price || p.originalPrice || p.price || 0,
    features: p.facilities || p.features || [],
    badges: p.badges || [],
    isCurrentPlan: false,
  });

  const availablePlans = (products || []).map(mapProduct);

  /* ─── Honest trust badges ─── */
  const trustBadges = [
    { icon: ShieldCheck, label: "Scientifically validated" },
    { icon: Sparkles, label: "AI-powered guidance" },
    { icon: UserCheck, label: "Personalized for you" },
  ];

  /* ─── Why This Works (defensible claims about your approach) ───
     TODO: When you integrate the actual psychometric frameworks,
     update these labels and descriptions to reference them by name.
     Examples for later: RIASEC, Big Five, Multiple Intelligences. */
  const whyThisWorks = [
    {
      icon: FlaskConical,
      title: "Research-informed design",
      description:
        "Our questions are built on established psychometric concepts to map your strengths reliably.",
      iconBg: "#DBEAFE",
      iconColor: "#2563EB",
    },
    {
      icon: Lightbulb,
      title: "Holistic assessment",
      description:
        "We look at aptitude, interests and personality together — because no single one tells the full story.",
      iconBg: "#FEF3C7",
      iconColor: "#B45309",
    },
    {
      icon: Flag,
      title: "Built for Indian students",
      description:
        "Designed around Indian streams, exams and career paths — not Western tests rebranded.",
      iconBg: "#FFE4E6",
      iconColor: "#BE123C",
    },
    {
      icon: Eye,
      title: "Personal, not pre-baked",
      description:
        "Every report is generated for the individual, not picked from a template library.",
      iconBg: "#DCFCE7",
      iconColor: "#15803D",
    },
  ];

  /* ─── What You'll Get (only list things you can actually deliver) ───
     TODO: When AI report integration is live, expand "Personalized report"
     description with page count or specifics. When ongoing mentorship is
     ready, add it as a 5th card. When college shortlist tool is built,
     add it as a 6th card. */
  const whatYouGet = [
    {
      icon: ClipboardCheck,
      title: "3-part assessment",
      description:
        "Strengths, interests and aptitude tests — all completed online at your own pace.",
      iconBg: "#DBEAFE",
      iconColor: "#2563EB",
    },
    {
      icon: FileText,
      title: "Personalized report",
      description:
        "A clear summary of your profile, recommended career directions and the reasoning behind them.",
      iconBg: "#FEF3C7",
      iconColor: "#B45309",
    },
    {
      icon: Route,
      title: "Education roadmap",
      description:
        "Streams, subjects and exam paths matched to your profile, with clear next steps.",
      iconBg: "#FFE4E6",
      iconColor: "#BE123C",
    },
    {
      icon: MessageCircle,
      title: "Counsellor conversation",
      description:
        "A 1-on-1 session to walk through your report and answer questions you or your parents have.",
      iconBg: "#DCFCE7",
      iconColor: "#15803D",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const openPlanFromState = location?.state?.openPlan;
    const saved = localStorage.getItem("selectedPlan");
    if (openPlanFromState) {
      if (saved) {
        try {
          setSelectedPlan(JSON.parse(saved));
        } catch (e) {}
      }
      setShowPlanModal(true);
      if (location?.state && location.state.openPlan) {
        try {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        } catch (e) {}
      }
      return;
    }

    if (saved) {
      try {
        setSelectedPlan(JSON.parse(saved));
        setShowPlanModal(true);
      } catch (e) {}
    }
  }, [location]);

  const togglePlanFeatures = (planId) => {
    setExpandedPlanFeatures((prev) =>
      prev.includes(planId)
        ? prev.filter((p) => p !== planId)
        : [...prev, planId],
    );
  };

  const handleConfirmUpgradeWithPlan = async (plan) => {
    const activePlan = plan || selectedPlan;
    if (!activePlan) return;

    try {
      setIsProcessing(true);

      const payload = {
        product_id:
          activePlan.id || activePlan.product_id || activePlan.productId,
      };

      const promoCode = localStorage.getItem("userPromoCode");
      if (promoCode) payload.promo_code = promoCode;

      const orderData = await initiatePayment(payload).unwrap();

      if (orderData.key_id === "FREE") {
        toast.success("Plan applied successfully (free).");
        localStorage.removeItem("userPromoCode");
        setShowPlanModal(false);
        setShowPromoPopup(false);
        setIsProcessing(false);
        navigate("/student-additional-details");
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || typeof window.Razorpay === "undefined") {
        toast.error("Payment system not ready. Please try again later.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CareerCompass",
        description: `Payment for ${activePlan.name}`,
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            toast.success("Payment successful. Plan activated.");
            localStorage.removeItem("userPromoCode");
            setShowPlanModal(false);
            setShowPromoPopup(false);
            setIsProcessing(false);
            navigate("/student/booking");
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed. Please contact support.");
            setIsProcessing(false);
          }
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#2563EB" },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      if (err?.status === 401) {
        setIsProcessing(false);
        navigate("/login", { state: { from: "/prepayment" } });
        return;
      }
      toast.error(getApiErrorMessage(err, "Failed to initiate payment"));
      setIsProcessing(false);
    }
  };

  const openPromoForPlan = (plan) => {
    if (!plan) return;

    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({
        productId: plan.id || plan.product_id || plan.productId,
        name: plan.name,
      }),
    );

    if (!isLoggedIn) {
      setShowPlanModal(false);
      navigate("/signup", { state: { from: "/prepayment" } });
      return;
    }

    setPendingPlan(plan);
    setSelectedPlan(plan);
    setShowPlanModal(false);
    const initial = localStorage.getItem("userPromoCode") || "";
    setInitialPromoValue(initial);
    setShowPromoPopup(true);
  };

  const handlePromoApply = (promo) => {
    if (!promo) return;
    localStorage.setItem("userPromoCode", promo);
    setShowPromoPopup(false);
    const planToProcess = pendingPlan;
    setPendingPlan(null);
    if (planToProcess) handleConfirmUpgradeWithPlan(planToProcess);
  };

  const handlePromoSkip = () => {
    localStorage.removeItem("userPromoCode");
    setShowPromoPopup(false);
    const planToProcess = pendingPlan;
    setPendingPlan(null);
    if (planToProcess) handleConfirmUpgradeWithPlan(planToProcess);
  };

  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  /* ════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="text-white pt-8 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-5"
        style={{ background: "#2563EB" }}
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Nav row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-8 sm:mb-10">
            <button
              onClick={() => navigate("/")}
              className="rounded-lg font-semibold px-4 py-2 text-sm inline-flex items-center gap-2 transition-all duration-150 hover:bg-white/10"
              style={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>

            <button
              onClick={() => navigate("/login")}
              className="rounded-lg font-semibold px-4 py-2 text-sm inline-flex items-center gap-2 transition-all duration-150"
              style={{ background: "#FBBF24", color: "#78350F" }}
            >
              Login
              <LogIn className="w-4 h-4" />
            </button>
          </div>

          {/* Hero content */}
          <div className="text-center px-2 max-w-3xl mx-auto">
            <div className="mb-4">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#FBBF24",
                  letterSpacing: "0.6px",
                }}
              >
                READY TO BEGIN YOUR JOURNEY
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              One step away from career clarity
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg"
              style={{ color: "#BFDBFE" }}
            >
              Scientific career assessment + expert counselling, designed for
              students like you
            </p>

            {/* Trust badges — honest, no fake numbers */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "white",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: "#FBBF24" }} />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                className="rounded-lg font-semibold px-8 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/50 border-none active:scale-95 transition-transform duration-150 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                style={{ background: "#FF6B6B", color: "white" }}
                onClick={() => setShowPlanModal(true)}
              >
                Continue &amp; Choose Plan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-5"
        style={{ background: "#F8FAFC" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p
              className="font-semibold mb-2"
              style={{
                color: "#FBBF24",
                fontSize: "11px",
                letterSpacing: "1.4px",
              }}
            >
              HOW IT WORKS
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#0F172A" }}
            >
              A simple scientific process
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "#64748B" }}>
              Designed to help students and parents make confident career
              decisions step by step.
            </p>
          </div>

          {/* Step 1 */}
          <div
            className="mt-5 rounded-2xl p-5 sm:p-8 bg-white"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              className="text-center text-lg sm:text-xl font-semibold mb-2"
              style={{ color: "#2563EB" }}
            >
              Step 1 — Assessment Tests
            </h3>
            <p
              className="text-center text-sm mb-6"
              style={{ color: "#64748B" }}
            >
              Three short tests to map your strengths, interests and aptitude
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {steps.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setModalText(item)}
                  className="p-5 sm:p-6 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#F8FAFC",
                    border: "0.5px solid #E2E8F0",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg font-semibold mb-4 text-sm"
                    style={{ background: "#DBEAFE", color: "#2563EB" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <h4
                    className="text-base sm:text-lg font-semibold mb-2"
                    style={{ color: "#0F172A" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "#64748B" }}
                  >
                    {item.short}
                  </p>
                  <button
                    className="text-sm font-semibold inline-flex items-center gap-1 hover:underline"
                    style={{ color: "#2563EB" }}
                  >
                    Read more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 & 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-6 max-w-4xl mx-auto">
            {stepTwoThree.map((item, i) => (
              <div
                key={i}
                onClick={() => setModalText(item)}
                className="bg-white p-5 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "0.5px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg font-semibold mb-4 text-sm mx-auto"
                  style={{ background: "#FEF3C7", color: "#B45309" }}
                >
                  {i + 2}
                </div>
                <h3
                  className="text-base sm:text-lg text-center font-semibold mb-2"
                  style={{ color: "#0F172A" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-center leading-relaxed mb-3"
                  style={{ color: "#64748B" }}
                >
                  {item.short}
                </p>
                <button
                  className="block mx-auto text-sm font-semibold inline-flex items-center gap-1 hover:underline"
                  style={{ color: "#2563EB" }}
                >
                  Read more <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS WORKS ──
          TODO: When you integrate specific psychometric frameworks
          (RIASEC, Big Five, etc.), update the whyThisWorks array above
          to reference them by name. Also update card 4 ("Personal, not
          pre-baked") with psychologist-review language once that's live. */}
      <section className="py-12 sm:py-16 px-4 sm:px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p
              className="font-semibold mb-2"
              style={{
                color: "#FBBF24",
                fontSize: "11px",
                letterSpacing: "1.4px",
              }}
            >
              WHY THIS WORKS
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#0F172A" }}
            >
              A thoughtful, structured approach
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "#64748B" }}>
              How CareerCompass thinks about career discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyThisWorks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-5 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{
                    background: "#F8FAFC",
                    border: "0.5px solid #E2E8F0",
                  }}
                >
                  <div
                    className="rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "44px",
                      height: "44px",
                      background: item.iconBg,
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: item.iconColor }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-base md:text-lg font-semibold mb-1.5"
                      style={{ color: "#0F172A" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#64748B" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL GET ──
          TODO: When AI report integration is live, expand "Personalized
          report" with page count or specific deliverables. When ongoing
          mentorship is ready, add it as a 5th card. When college shortlist
          tool is built, add it as a 6th card. */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-5"
        style={{ background: "#F8FAFC" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p
              className="font-semibold mb-2"
              style={{
                color: "#2563EB",
                fontSize: "11px",
                letterSpacing: "1.4px",
              }}
            >
              WHAT YOU'LL GET
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#0F172A" }}
            >
              Real deliverables, not vague promises
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "#64748B" }}>
              Here's what you'll walk away with
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatYouGet.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl transition-all hover:-translate-y-1"
                  style={{
                    border: "0.5px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div
                    className="rounded-xl flex items-center justify-center mb-4"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: item.iconBg,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: item.iconColor }}
                    />
                  </div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "#0F172A" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#64748B" }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="font-semibold mb-2"
              style={{
                color: "#2563EB",
                fontSize: "11px",
                letterSpacing: "1.4px",
              }}
            >
              FAQ
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ color: "#0F172A" }}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQs.map((item, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden bg-white transition-all"
                style={{ border: "0.5px solid #E2E8F0" }}
              >
                <div
                  className="p-4 sm:p-5 cursor-pointer font-semibold flex justify-between items-center gap-3"
                  onClick={() => toggleFAQ(index)}
                >
                  <span
                    className="text-sm sm:text-base leading-snug"
                    style={{ color: "#0F172A" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="text-xl font-bold flex-shrink-0 transition-transform"
                    style={{
                      color: "#2563EB",
                      transform:
                        openFAQ === index ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </div>
                {openFAQ === index && (
                  <div
                    className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base leading-relaxed"
                    style={{ color: "#64748B" }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PLAN SELECTION MODAL
      ════════════════════════════════════════════ */}
      {showPlanModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div
              className="sticky top-0 z-20 p-4 sm:p-6 flex items-center justify-between"
              style={{ background: "#2563EB", color: "white" }}
            >
              <h2 className="text-xl sm:text-2xl font-bold">
                Choose your plan
              </h2>
              <button
                onClick={() => setShowPlanModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-48 rounded-lg"
                      style={{ background: "#F1F5F9" }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availablePlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className="relative rounded-xl p-5 cursor-pointer transition-all"
                      style={{
                        border:
                          selectedPlan?.id === plan.id
                            ? "2px solid #2563EB"
                            : "0.5px solid #E2E8F0",
                        background:
                          selectedPlan?.id === plan.id ? "#EFF6FF" : "white",
                        boxShadow:
                          selectedPlan?.id === plan.id
                            ? "0 4px 12px rgba(37, 99, 235, 0.15)"
                            : "0 1px 3px rgba(15, 23, 42, 0.04)",
                      }}
                    >
                      {plan.badges && plan.badges.length > 0 && (
                        <div className="absolute top-0 right-4 transform -translate-y-1/2 flex flex-wrap gap-2 justify-end">
                          {plan.badges.map((badge, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                              style={{
                                background: "#FBBF24",
                                color: "#78350F",
                              }}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3
                        className="font-bold text-base sm:text-lg mb-1"
                        style={{ color: "#0F172A" }}
                      >
                        {plan.name}
                      </h3>

                      {plan.description && (
                        <p
                          className="text-xs sm:text-sm mb-3"
                          style={{ color: "#64748B" }}
                        >
                          {plan.description}
                        </p>
                      )}

                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-xl sm:text-2xl font-bold"
                            style={{ color: "#2563EB" }}
                          >
                            ₹{plan.price}
                          </span>
                          {plan.originalPrice > plan.price && (
                            <span
                              className="text-xs sm:text-sm line-through"
                              style={{ color: "#94A3B8" }}
                            >
                              ₹{plan.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {plan.features
                          .slice(
                            0,
                            expandedPlanFeatures.includes(plan.id)
                              ? plan.features.length
                              : 3,
                          )
                          .map((feature, idx) => (
                            <li
                              key={idx}
                              className="text-xs flex items-start gap-2"
                              style={{ color: "#475569" }}
                            >
                              <div
                                className="h-1.5 w-1.5 rounded-full mt-1 flex-shrink-0"
                                style={{ background: "#2563EB" }}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}

                        {plan.features.length > 3 && (
                          <li>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePlanFeatures(plan.id);
                              }}
                              className="text-xs italic hover:underline"
                              style={{ color: "#2563EB" }}
                            >
                              {expandedPlanFeatures.includes(plan.id)
                                ? "Show less"
                                : `+${plan.features.length - 3} more features`}
                            </button>
                          </li>
                        )}
                      </ul>

                      <div
                        className="w-full py-2 rounded-lg text-center text-sm font-semibold transition-all"
                        style={
                          selectedPlan?.id === plan.id
                            ? { background: "#2563EB", color: "white" }
                            : {
                                border: "1px solid #2563EB",
                                color: "#2563EB",
                                background: "white",
                              }
                        }
                      >
                        {selectedPlan?.id === plan.id
                          ? "Selected"
                          : "Select & Pay"}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-wrap gap-3 justify-end"
                style={{ borderTop: "1px solid #E2E8F0" }}
              >
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base"
                  style={{
                    border: "1px solid #E2E8F0",
                    color: "#475569",
                    background: "white",
                  }}
                >
                  Cancel
                </button>

                <button
                  disabled={!selectedPlan || isProcessing}
                  onClick={() => openPromoForPlan(selectedPlan)}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-white transition-all text-sm sm:text-base"
                  style={{
                    background:
                      selectedPlan && !isProcessing ? "#2563EB" : "#CBD5E1",
                    cursor:
                      selectedPlan && !isProcessing ? "pointer" : "not-allowed",
                    opacity: selectedPlan && !isProcessing ? 1 : 0.7,
                  }}
                >
                  {isProcessing ? "Processing..." : "Save & Proceed"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          PROMO CODE POPUP
      ════════════════════════════════════════════ */}
      <PromoCodePopup
        isOpen={showPromoPopup}
        onApply={handlePromoApply}
        onSkip={handlePromoSkip}
        initialPromo={initialPromoValue}
      />

      {/* ════════════════════════════════════════════
          READ-MORE TEXT MODAL
      ════════════════════════════════════════════ */}
      {modalText && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-3 sm:px-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setModalText(null)}
        >
          <div
            className="bg-white max-w-2xl w-full p-5 sm:p-6 rounded-xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalText(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "#F1F5F9", color: "#475569" }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h3
              className="text-lg sm:text-xl font-bold mb-4 pr-6"
              style={{ color: "#0F172A" }}
            >
              {modalText.title}
            </h3>
            <div
              className="whitespace-pre-line leading-relaxed text-sm sm:text-base"
              style={{ color: "#475569" }}
            >
              {modalText.full.split("\n").map((line, i) => {
                if (line.startsWith("Trouble:"))
                  return (
                    <p key={i}>
                      <strong style={{ color: "#0F172A" }}>Trouble:</strong>
                      {line.replace("Trouble:", "")}
                    </p>
                  );
                if (line.startsWith("Approach:"))
                  return (
                    <p key={i}>
                      <strong style={{ color: "#0F172A" }}>Approach:</strong>
                      {line.replace("Approach:", "")}
                    </p>
                  );
                if (line.startsWith("What You Get:"))
                  return (
                    <p key={i} className="mt-3">
                      <strong style={{ color: "#0F172A" }}>
                        What You Get:
                      </strong>
                    </p>
                  );
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Prepaymentpage;
