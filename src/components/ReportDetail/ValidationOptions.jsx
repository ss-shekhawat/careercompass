import { Download, CheckCircle, PhoneCallIcon } from "lucide-react";
import {
  useUpdateStudentReportStatusMutation,
  useGetAllAdminReportsQuery,
} from "../../redux/services/assessmentApi";
import Buttons from "../Ui/Buttons";
import { useApiErrorHandling } from "../../hooks/useApiErrorHandling";

const ValidationOptions = ({ role, onValidate, onRequestReview, reportId }) => {
  const IconComponent = role === "admin" ? CheckCircle : Download;
  const { handleError } = useApiErrorHandling();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateStudentReportStatusMutation();
  const { data: reports } = useGetAllAdminReportsQuery();

  const reportList = Array.isArray(reports?.data) ? reports.data : [];
  const currentReport = reportList.find((r) => r.report_id === reportId);
  const reportStatus = currentReport?.status || "pending";

  const handleAdminApprove = async () => {
    if (!reportId) return;
    try {
      await updateStatus({
        reportId,
        payload: { status: "approved" },
      }).unwrap();
      if (onValidate) onValidate();
    } catch (err) {
      handleError(err);
    }
  };

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <div className="bg-white rounded-2xl p-6" style={cardStyle}>
      <div className="grid md:grid-cols-1 gap-6">
        <div className="text-center">
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "#DCFCE7" }}
          >
            <IconComponent className="h-7 w-7" style={{ color: "#15803D" }} />
          </div>
          <h3 className="text-base font-bold mb-2" style={{ color: "#0F172A" }}>
            {role === "admin" ? "Approve Report" : "Download Report"}
          </h3>
          <p className="mb-4 text-sm" style={{ color: "#64748B" }}>
            {role === "admin"
              ? "Review and approve the student's report for final submission."
              : "Download a detailed report of your assessment results."}
          </p>

          <Buttons
            onClick={role === "admin" ? handleAdminApprove : onValidate}
            disabled={
              role === "admin" && (isUpdating || reportStatus === "approved")
            }
            className="text-sm px-5 py-2 rounded-lg font-semibold text-white transition-all"
            style={{
              background:
                role === "admin" && reportStatus === "approved"
                  ? "#94A3B8"
                  : "#2563EB",
              cursor:
                role === "admin" && reportStatus === "approved"
                  ? "not-allowed"
                  : "pointer",
              border: "none",
            }}
          >
            {role === "admin"
              ? reportStatus === "approved"
                ? "Approved"
                : isUpdating
                  ? "Approving..."
                  : "Approve"
              : "Download"}
          </Buttons>
        </div>

        {role === "student" && (
          <div className="text-center cursor-not-allowed relative group">
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#DBEAFE" }}
            >
              <PhoneCallIcon className="h-7 w-7" style={{ color: "#2563EB" }} />
            </div>
            <h3
              className="text-base font-bold mb-2"
              style={{ color: "#0F172A" }}
            >
              Speak to a Counsellor
            </h3>
            <p className="mb-4 text-sm" style={{ color: "#64748B" }}>
              Request a professional review from our psychologist.
            </p>
            <div className="relative inline-block">
              <Buttons
                className="text-sm px-5 py-2 rounded-lg font-semibold cursor-not-allowed"
                style={{
                  background: "#F1F5F9",
                  color: "#94A3B8",
                  border: "none",
                }}
                disabled
              >
                Speak to a Counsellor
              </Buttons>
            </div>
            <span
              className="absolute left-1/2 -translate-x-1/2 -top-10 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap"
              style={{ background: "#0F172A", color: "white" }}
            >
              Coming Soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationOptions;
