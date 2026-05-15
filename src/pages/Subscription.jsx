import React, { useState } from "react";
import { Check, Crown, ArrowRight } from "lucide-react";
import StudentLayout from "../components/StudentLayout";
import Buttons from "../components/Ui/Buttons";
import { toast } from "react-toastify";
import {
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
} from "../redux/services/paymentApi";
import { useGetPublicProductsQuery } from "../redux/services/entityApi";
import { loadRazorpayScript } from "../utils/razorpay";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const { handleError } = useApiErrorHandling();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: products = [], isLoading } = useGetPublicProductsQuery();
  const [initiatePayment] = useInitiatePaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const plans = (products || []).map((p) => ({
    id: p.product_id || p.productId || p.id,
    name: p.name || p.product_name,
    description: p.description || "",
    price: p.discounted_price || p.price || 0,
    originalPrice: p.original_price || p.price || 0,
    features: p.facilities || p.features || [],
    badge: p.badges?.[0] || null,
  }));

  const handleSelectPlan = async (plan) => {
    setSelectedPlan(plan);
    setIsProcessing(true);
    try {
      const orderData = await initiatePayment({ product_id: plan.id }).unwrap();

      if (orderData.key_id === "FREE") {
        toast.success("Plan applied successfully (free).");
        setIsProcessing(false);
        navigate("/student/dashboard");
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
        description: `Payment for ${plan.name}`,
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();
            toast.success("Payment successful! Plan activated.");
            navigate("/student/subscription");
          } catch (err) {
            handleError(err);
          }
          setIsProcessing(false);
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
      handleError(err);
      setIsProcessing(false);
    }
  };

  const cardStyle = (isSel, badge) => {
    return isSel
      ? {
          border: "2px solid #2563EB",
          background: "#EFF6FF",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
        }
      : badge
        ? {
            border: "2px solid #FBBF24",
            background: "white",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
          }
        : {
            border: "0.5px solid #E2E8F0",
            background: "white",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
          };
  };

  return (
    <StudentLayout title="Choose Your Plan">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p
            className="font-semibold mb-2"
            style={{
              color: "#FBBF24",
              fontSize: "11px",
              letterSpacing: "1.4px",
            }}
          >
            UPGRADE YOUR JOURNEY
          </p>
          <h1
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "#0F172A" }}
          >
            Choose your plan
          </h1>
          <p
            className="text-sm md:text-base max-w-xl mx-auto"
            style={{ color: "#64748B" }}
          >
            Pick the plan that fits your career discovery journey
          </p>
        </div>

        {/* Plans */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse max-w-5xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-xl"
                style={{ background: "#F1F5F9" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const isSel = selectedPlan?.id === plan.id;
              return (
                <div
                  key={plan.id}
                  className="relative rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col"
                  style={cardStyle(isSel, plan.badge)}
                >
                  {plan.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                      style={{ background: "#FBBF24", color: "#78350F" }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: "#0F172A" }}
                  >
                    {plan.name}
                  </h3>

                  {plan.description && (
                    <p className="text-xs mb-3" style={{ color: "#64748B" }}>
                      {plan.description}
                    </p>
                  )}

                  <div className="mb-5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl font-extrabold"
                        style={{ color: "#2563EB" }}
                      >
                        ₹{plan.price}
                      </span>
                      {plan.originalPrice > plan.price && (
                        <span
                          className="text-sm line-through"
                          style={{ color: "#94A3B8" }}
                        >
                          ₹{plan.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: "#475569" }}
                      >
                        <Check
                          className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: "#15803D" }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Buttons
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isProcessing}
                    className="w-full rounded-lg font-semibold py-2.5 text-sm text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: isProcessing ? "#93C5FD" : "#2563EB",
                      border: "none",
                    }}
                  >
                    {isProcessing && isSel ? (
                      "Processing..."
                    ) : (
                      <>
                        Select &amp; Pay <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Buttons>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ-ish footer */}
        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: "#64748B" }}>
            Already have a plan?{" "}
            <button
              onClick={() => navigate("/student/subscription")}
              className="font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
              style={{ color: "#2563EB" }}
            >
              View my subscription
            </button>
          </p>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Subscription;
