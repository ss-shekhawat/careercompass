import { User, Download, CheckCircle, PhoneCallIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetStudentReportDownloadUrlQuery } from "../../redux/services/assessmentApi";
import { toast } from "react-toastify";
import Buttons from "../Ui/Buttons";

const StudentReportValidation = ({
  role,
  onValidate,
  onRequestReview,
  sessionId,
  studentName,
  reportId,
  studentId,
}) => {
  const IconComponent = role === "admin" ? CheckCircle : Download;
  const numericSessionId = Number(sessionId);

  const { data, isLoading, isError, error } =
    useGetStudentReportDownloadUrlQuery(numericSessionId, {
      skip: role !== "student",
    });

  const handleDownload = () => {
    if (error?.status === 403) {
      toast.error(
        error.data?.message ||
          "Payment required to download reports. Please purchase a plan.",
      );
      return;
    }
    if (data && data.pdf_url) {
      fetch(data.pdf_url)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const studentNameRaw = studentName || "Student";
          const capitalizedName = studentNameRaw.replace(/\b\w/g, (c) =>
            c.toUpperCase(),
          );
          const safeName = encodeURIComponent(
            capitalizedName.replace(/[^a-zA-Z0-9]+/g, "_"),
          );
          const filename = `CareerCompass_${studentId}_${safeName}.pdf`;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(() => toast.error("Failed to download file."));
    } else {
      toast.error("Download link not available. Please try again later.");
    }
  };

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <div className="bg-white rounded-2xl p-6" style={cardStyle}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Approve / Download */}
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
            onClick={
              role === "student"
                ? handleDownload
                : () => onValidate && onValidate(sessionId)
            }
            disabled={role === "student" && (isLoading || isError)}
            className="text-sm px-5 py-2 rounded-lg font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "#2563EB", border: "none" }}
          >
            {role === "admin"
              ? "Approve"
              : isLoading
                ? "Loading..."
                : error?.status === 403
                  ? "Payment Required"
                  : isError
                    ? "Error"
                    : "Download"}
          </Buttons>
        </div>

        {/* Admin: Assign to Counsellor */}
        {role === "admin" && (
          <div className="text-center cursor-not-allowed relative group">
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#DBEAFE" }}
            >
              <User className="h-7 w-7" style={{ color: "#2563EB" }} />
            </div>
            <h3
              className="text-base font-bold mb-2"
              style={{ color: "#0F172A" }}
            >
              Assign to Counsellor
            </h3>
            <p className="mb-4 text-sm" style={{ color: "#64748B" }}>
              Request to review the report.
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
                Assign to a Counsellor
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

        {/* Student: Speak to Counsellor */}
        {role === "student" && <StudentSpeak />}
      </div>
    </div>
  );
};

const StudentSpeak = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <div
        className="h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ background: "#DBEAFE" }}
      >
        <PhoneCallIcon className="h-7 w-7" style={{ color: "#2563EB" }} />
      </div>
      <h3 className="text-base font-bold mb-2" style={{ color: "#0F172A" }}>
        Speak to a Counsellor
      </h3>
      <p className="mb-4 text-sm" style={{ color: "#64748B" }}>
        Request a counselling session with our experts.
      </p>
      <Buttons
        onClick={() => navigate("/student/booking")}
        className="text-sm px-5 py-2 rounded-lg font-semibold text-white"
        style={{ background: "#2563EB", border: "none" }}
      >
        Speak to a Counsellor
      </Buttons>
    </div>
  );
};

export default StudentReportValidation;
