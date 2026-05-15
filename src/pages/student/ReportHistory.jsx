import React, { useState } from "react";
import StudentLayout from "../../components/StudentLayout";
import { useNavigate } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import {
  useGetStudentReportsQuery,
  useGetStudentReportDownloadUrlQuery,
} from "../../redux/services/assessmentApi";
import Buttons from "../../components/Ui/Buttons";
import { useApiErrorHandling } from "../../hooks/useApiErrorHandling";
import ToastNotification, { showToast } from "../../components/Ui/Toast";

const ReportHistory = () => {
  const navigate = useNavigate();
  const [downloadingReportId, setDownloadingReportId] = useState(null);
  const { handleError } = useApiErrorHandling();

  const {
    data: reports = [],
    isLoading,
    isError,
  } = useGetStudentReportsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <StudentLayout title="Report">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-sm" style={{ color: "#64748B" }}>
            Loading reports...
          </p>
        </div>
      </StudentLayout>
    );
  }

  if (isError) {
    return (
      <StudentLayout title="Report">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-sm" style={{ color: "#DC2626" }}>
            Failed to load reports.
          </p>
        </div>
      </StudentLayout>
    );
  }

  const approvedReports = reports.filter(
    (report) => report.status === "approved",
  );

  return (
    <StudentLayout title="Report">
      <div className="min-h-screen">
        <div
          className="bg-white rounded-2xl p-5 sm:p-6"
          style={{
            border: "0.5px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
          }}
        >
          <h1
            className="text-xl md:text-2xl font-bold mb-5"
            style={{ color: "#0F172A" }}
          >
            Report History
          </h1>

          {approvedReports.length === 0 ? (
            <div className="text-center py-12">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                style={{ background: "#F1F5F9" }}
              >
                <FileText className="w-6 h-6" style={{ color: "#94A3B8" }} />
              </div>
              <h3 className="font-semibold mb-1" style={{ color: "#0F172A" }}>
                No reports yet
              </h3>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Complete your assessments to see reports here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {approvedReports.map((report) => (
                <ReportItem
                  key={report.report_id}
                  report={report}
                  navigate={navigate}
                  downloadingReportId={downloadingReportId}
                  setDownloadingReportId={setDownloadingReportId}
                  handleError={handleError}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastNotification />
    </StudentLayout>
  );
};

const ReportItem = ({
  report,
  navigate,
  downloadingReportId,
  setDownloadingReportId,
  handleError,
}) => {
  const {
    data: downloadData,
    isFetching,
    error,
    isError,
  } = useGetStudentReportDownloadUrlQuery(report.session_id, {
    skip: downloadingReportId !== report.report_id,
  });

  React.useEffect(() => {
    if (isError && error) {
      if (error.status === 403) {
        showToast(
          error.data?.message ||
            "Payment required to download reports. Please purchase a plan.",
          "error",
        );
      } else {
        handleError(error);
      }
      setDownloadingReportId(null);
    } else if (
      downloadData &&
      downloadData.pdf_url &&
      downloadingReportId === report.report_id
    ) {
      fetch(downloadData.pdf_url)
        .then((response) => {
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const studentNameRaw = report.student?.full_name || "Student";
          const capitalizedName = studentNameRaw.replace(/\b\w/g, (c) =>
            c.toUpperCase(),
          );
          const studentName = encodeURIComponent(
            capitalizedName.replace(/[^a-zA-Z0-9]+/g, "_"),
          );
          const filename = `CareerCompass_${report.student?.student_id}_${studentName}.pdf`;
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setDownloadingReportId(null);
        })
        .catch((error) => {
          handleError(error);
          setDownloadingReportId(null);
        });
    }
  }, [
    downloadData,
    downloadingReportId,
    report.report_id,
    setDownloadingReportId,
    handleError,
    report.student?.full_name,
    isError,
    error,
  ]);

  const handleDownload = (e) => {
    e.stopPropagation();
    setDownloadingReportId(report.report_id);
  };

  const isDownloading = downloadingReportId === report.report_id && isFetching;

  return (
    <div
      className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
      style={{
        border: "0.5px solid #E2E8F0",
        background: "#F8FAFC",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
      }}
      onClick={() => {
        const studentName = report.student?.full_name || "Unknown Student";
        navigate(
          `/student/report/:id?report_id=${report.report_id}&session_id=${report.session_id}&student_id=${report.student?.student_id}&student_name=${encodeURIComponent(studentName)}`,
        );
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#DBEAFE" }}
          >
            <FileText className="w-5 h-5" style={{ color: "#2563EB" }} />
          </div>
          <div className="min-w-0">
            <h3
              className="font-semibold truncate text-sm"
              style={{ color: "#0F172A" }}
            >
              Report #{report.report_id}
            </h3>
            <p className="text-sm truncate" style={{ color: "#64748B" }}>
              {report.student?.full_name || "Unknown Student"}
            </p>
            <p className="text-xs truncate" style={{ color: "#94A3B8" }}>
              {new Date(report.generated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span
            className="px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap capitalize"
            style={{ background: "#DCFCE7", color: "#15803D" }}
          >
            {report.status}
          </span>
          <Buttons
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "white",
              color: "#2563EB",
              border: "1px solid #E2E8F0",
            }}
            title={isDownloading ? "Downloading..." : "Download Report"}
          >
            <Download
              className={`h-4 w-4 ${isDownloading ? "animate-spin" : ""}`}
            />
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default ReportHistory;
