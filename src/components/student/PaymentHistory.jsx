import React, { useState } from "react";
import {
  Download,
  FileText,
  Calendar,
  IndianRupee,
  AlertCircle,
} from "lucide-react";
import Buttons from "../Ui/Buttons";
import Pagination from "../Ui/Pagination";
import { toast } from "react-toastify";
import { studentPaymentHistoryData } from "../../data/studentDummyData";

const PaymentHistory = ({
  paymentData: propPaymentData,
  isLoading: propLoading,
  error: propError,
}) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isDownloading, setIsDownloading] = useState(false);

  const paymentData = propPaymentData || studentPaymentHistoryData;
  const isLoading = propLoading || false;
  const error = propError || null;

  const handleDownloadInvoice = async (invoiceId, productName) => {
    if (!invoiceId) {
      toast.info("Invoice not available");
      return;
    }

    const asString = String(invoiceId || "").trim();
    const isAbsoluteUrl = /^https?:\/\//i.test(asString);
    let url = asString;

    if (!isAbsoluteUrl) {
      if (asString.startsWith("/")) {
        url = window.location.origin + asString;
      } else {
        toast.info(
          "Invoice download will be available soon. If urgent, contact support.",
        );
        return;
      }
    }

    try {
      setIsDownloading(true);
      const resp = await fetch(url, { mode: "cors" });
      if (!resp.ok) throw new Error("Failed to fetch invoice");
      const blob = await resp.blob();

      let filename = productName ? `${productName}_invoice.pdf` : "invoice.pdf";
      const contentDisp = resp.headers.get("content-disposition") || "";
      const match =
        /filename\*=UTF-8''([^;\n]+)/i.exec(contentDisp) ||
        /filename="?([^";]+)"?/i.exec(contentDisp);
      if (match && match[1]) filename = decodeURIComponent(match[1]);
      else {
        try {
          const parsed = new URL(url);
          const parts = parsed.pathname.split("/");
          const last = parts.pop() || parts.pop();
          if (last) filename = last;
        } catch (e) {}
      }

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      toast.error("Unable to download invoice");
    } finally {
      setIsDownloading(false);
    }
  };

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 animate-pulse" style={cardStyle}>
        <div
          className="h-6 rounded w-1/4 mb-4"
          style={{ background: "#E2E8F0" }}
        ></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded"
              style={{ background: "#E2E8F0" }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl p-6"
        style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
      >
        <div className="flex items-center gap-2" style={{ color: "#B91C1C" }}>
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Unable to load payment history</p>
        </div>
      </div>
    );
  }

  const payments = paymentData?.payments || [];
  const total = paymentData?.total || 0;

  const statusBadgeStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed") return { background: "#DCFCE7", color: "#15803D" };
    if (s === "pending") return { background: "#FEF3C7", color: "#B45309" };
    return { background: "#FEF2F2", color: "#B91C1C" };
  };

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6" style={cardStyle}>
      <h3
        className="text-base font-semibold mb-5 flex items-center gap-2"
        style={{ color: "#0F172A" }}
      >
        <FileText className="h-4 w-4" style={{ color: "#2563EB" }} />
        Payment &amp; Invoice History
      </h3>

      {payments.length === 0 ? (
        <div className="text-center py-12">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{ background: "#F1F5F9" }}
          >
            <IndianRupee className="h-6 w-6" style={{ color: "#94A3B8" }} />
          </div>
          <p className="font-semibold mb-1" style={{ color: "#0F172A" }}>
            No payments yet
          </p>
          <p className="text-sm" style={{ color: "#64748B" }}>
            When you subscribe to a plan, your payment history will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <th
                    className="text-left py-3 px-4 font-semibold text-xs"
                    style={{ color: "#64748B" }}
                  >
                    Date
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-xs"
                    style={{ color: "#64748B" }}
                  >
                    Plan
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-xs"
                    style={{ color: "#64748B" }}
                  >
                    Amount
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-xs"
                    style={{ color: "#64748B" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-center py-3 px-4 font-semibold text-xs"
                    style={{ color: "#64748B" }}
                  >
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={index}
                    className="transition-colors"
                    style={{ borderBottom: "1px solid #F1F5F9" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F8FAFC")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td
                      className="py-3 px-4 text-sm"
                      style={{ color: "#0F172A" }}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar
                          className="h-4 w-4"
                          style={{ color: "#94A3B8" }}
                        />
                        {new Date(payment.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </div>
                    </td>
                    <td
                      className="py-3 px-4 text-sm font-medium"
                      style={{ color: "#0F172A" }}
                    >
                      {payment.product_name}
                    </td>
                    <td
                      className="py-3 px-4 text-sm font-semibold"
                      style={{ color: "#2563EB" }}
                    >
                      ₹{payment.amount}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                        style={statusBadgeStyle(payment.payment_status)}
                      >
                        {payment.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {payment.invoice_id ? (
                        <Buttons
                          onClick={() =>
                            handleDownloadInvoice(
                              payment.invoice_id,
                              payment.product_name,
                            )
                          }
                          disabled={isDownloading}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-md"
                          style={{
                            color: "#2563EB",
                            background: "transparent",
                            border: "1px solid #DBEAFE",
                          }}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </Buttons>
                      ) : (
                        <span className="text-sm" style={{ color: "#94A3B8" }}>
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {payments.map((payment, index) => (
              <div
                key={index}
                className="rounded-lg p-4"
                style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#0F172A" }}
                    >
                      {payment.product_name}
                    </p>
                    <div
                      className="flex items-center gap-1 text-xs mt-1"
                      style={{ color: "#94A3B8" }}
                    >
                      <Calendar className="h-3 w-3" />
                      {new Date(payment.created_at).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                    style={statusBadgeStyle(payment.payment_status)}
                  >
                    {payment.payment_status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-base font-bold"
                    style={{ color: "#2563EB" }}
                  >
                    ₹{payment.amount}
                  </span>
                  {payment.invoice_id ? (
                    <Buttons
                      onClick={() =>
                        handleDownloadInvoice(
                          payment.invoice_id,
                          payment.product_name,
                        )
                      }
                      disabled={isDownloading}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md"
                      style={{
                        color: "#2563EB",
                        background: "white",
                        border: "1px solid #DBEAFE",
                      }}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Invoice
                    </Buttons>
                  ) : (
                    <span className="text-xs" style={{ color: "#94A3B8" }}>
                      —
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {total > size && (
            <div
              className="mt-6 pt-6"
              style={{ borderTop: "1px solid #E2E8F0" }}
            >
              <Pagination
                total={total}
                page={page}
                size={size}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
