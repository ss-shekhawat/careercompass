import React from "react";
import StudentLayout from "../../components/StudentLayout";
import MySubscription from "../../components/student/MySubscription";
import PaymentHistory from "../../components/student/PaymentHistory";
import { useGetProfilePlansQuery } from "../../redux/services/paymentApi";

const StudentSubscription = () => {
  return (
    <StudentLayout title="Plans & Payments">
      <div className="mx-auto">
        <div className="mb-6">
          <h1
            className="text-xl md:text-2xl font-bold mb-2"
            style={{ color: "#0F172A" }}
          >
            Plans &amp; Payments
          </h1>
          <p className="text-sm" style={{ color: "#64748B" }}>
            Manage your subscription and view your payment history
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <SubscriptionWithApi />
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentSubscription;

function SubscriptionWithApi() {
  const { data: profilePlans, isLoading, error } = useGetProfilePlansQuery();

  const subscription = React.useMemo(() => {
    const cp = profilePlans?.current_plan;
    if (!cp) return null;
    return {
      product_name: cp.plan_name,
      product_id: cp.product_id || cp.productId || cp.plan_id || cp.id || null,
      plan_type: cp.billing_cycle,
      purchase_date: cp.purchase_date || null,
      valid_until: cp.valid_until || null,
      actual_amount: cp.original_price,
      discounted_amount: cp.plan_price,
      status: cp.status_label || (cp.is_active ? "Active" : "Inactive"),
      features: cp.features || [],
    };
  }, [profilePlans]);

  const paymentData = React.useMemo(() => {
    const history = profilePlans?.payment_history || [];
    const payments = history.map((h) => ({
      created_at: new Date(h.date).toISOString(),
      product_name: h.plan_name,
      amount: h.amount,
      payment_status: h.status,
      invoice_id: h.invoice_url || null,
    }));
    return { payments, total: payments.length };
  }, [profilePlans]);

  return (
    <>
      <MySubscription
        subscription={subscription}
        availablePlans={profilePlans}
        isLoading={isLoading}
        error={error}
      />
      <PaymentHistory
        paymentData={paymentData}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
