import { useState } from "react";
import StudentLayout from "../../components/StudentLayout";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ITestRadarChart from "../../components/ReportDetail/ITestRadarChart";
import ATestCards from "../../components/ReportDetail/ATestPieChart";
import CareerRecommendations from "../../components/ReportDetail/CareerRecommendations";
import CareerDetailModal from "../../components/ReportDetail/CareerDetailModal";
import StudentReportValidation from "../../components/ReportDetail/StudentReportValidation";
import ValidationModal from "../../components/ReportDetail/ValidationModal";
import Buttons from "../../components/Ui/Buttons";
import { ChevronRight, X, Eye, ArrowLeft } from "lucide-react";
import {
  useGetStudentResultsSummaryQuery,
  useGetStudentStrengthsWeaknessesQuery,
} from "../../redux/services/assessmentApi";
import { useGetProfileQuery } from "../../redux/services/studentApi";
import StudentViewNotesModal from "../../components/student/StudentViewNotesModal";

const ReportDetail = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const [showStrengthsModal, setShowStrengthsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const reportId = searchParams.get("report_id");
  const sessionId = searchParams.get("session_id");
  const studentId = searchParams.get("student_id");
  const parsedSessionId = sessionId ? parseInt(sessionId, 10) : undefined;
  const studentName = searchParams.get("student_name");

  const { data: reportData } = useGetStudentResultsSummaryQuery({
    report_id: Number(id),
    session_id: parsedSessionId,
  });

  const {
    data: strengthsData,
    isLoading: strengthsLoading,
    isError: strengthsError,
  } = useGetStudentStrengthsWeaknessesQuery(parsedSessionId, {
    skip: !parsedSessionId,
  });

  const { data: profile } = useGetProfileQuery();

  const uniqueStrengths = Array.isArray(strengthsData?.strengths)
    ? Array.from(new Set(strengthsData.strengths))
    : [];

  const customStrengths = Array.isArray(reportData?.custom_strengths)
    ? reportData.custom_strengths
    : Array.isArray(strengthsData?.custom_strengths)
      ? strengthsData.custom_strengths
      : [];

  const handleCareerClick = (career) => setSelectedCareer(career);
  const handleValidate = () => setShowValidation(true);
  const handleRequestReview = () =>
    toast.success(
      "Your request has been received. We will schedule the call soon. Thank You!",
    );

  const StrengthsModal = ({ isOpen, onClose, strengths }) => {
    if (!isOpen) return null;
    const remaining = (strengths || []).slice(5);

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(15, 23, 42, 0.6)" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ color: "#0F172A" }}>
              All Strengths
            </h2>
            <Buttons
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "#F1F5F9",
                color: "#475569",
                border: "none",
              }}
            >
              <X className="w-4 h-4" />
            </Buttons>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {remaining.length === 0 ? (
              <div className="text-sm" style={{ color: "#94A3B8" }}>
                No additional strengths.
              </div>
            ) : (
              remaining.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="rounded-lg px-4 py-2 text-sm"
                  style={{
                    border: "0.5px solid #E2E8F0",
                    color: "#475569",
                    background: "#F8FAFC",
                  }}
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const isAdmin = location.pathname.startsWith("/admin");
  const backPath = isAdmin ? "/admin/reports" : "/student/report";
  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <StudentLayout>
      <div className="container mx-auto p-1">
        <div className="mb-5 flex items-center justify-between">
          <Buttons
            onClick={() => navigate(backPath)}
            className="text-sm font-semibold rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5"
            style={{
              color: "#2563EB",
              background: "transparent",
              border: "none",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Buttons>

          <Buttons
            onClick={() => setShowNotesModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white"
            style={{ background: "#2563EB", border: "none" }}
          >
            <Eye size={14} />
            View Notes
          </Buttons>
        </div>

        <div className="grid xl:grid-cols-2 gap-6 mb-6">
          <ITestRadarChart
            interestData={reportData?.interest_test_results || {}}
          />
          <ATestCards
            aTestResults={reportData?.aptitude_test_results}
            sessionId={parsedSessionId}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 mb-8">
          <div
            className="bg-white rounded-2xl p-6 flex flex-col"
            style={cardStyle}
          >
            <h4
              className="text-base md:text-lg font-semibold mb-3 text-center sm:text-left"
              style={{ color: "#0F172A" }}
            >
              Strengths As Per Assessment
            </h4>

            {strengthsLoading && (
              <div className="text-sm" style={{ color: "#64748B" }}>
                Loading...
              </div>
            )}
            {strengthsError && (
              <div className="text-sm" style={{ color: "#DC2626" }}>
                Failed to load strengths.
              </div>
            )}

            <div className="space-y-3 mt-2">
              {uniqueStrengths.length > 0
                ? uniqueStrengths.slice(0, 5).map((item, idx) => (
                    <div
                      key={`${item}-${idx}`}
                      className="rounded-lg p-3 text-sm transition-colors"
                      style={{
                        border: "0.5px solid #E2E8F0",
                        color: "#475569",
                        background: "#F8FAFC",
                      }}
                    >
                      {item}
                    </div>
                  ))
                : !strengthsLoading &&
                  !strengthsError && (
                    <div
                      className="text-sm text-center mt-3"
                      style={{ color: "#94A3B8" }}
                    >
                      No strengths available
                    </div>
                  )}
            </div>

            {uniqueStrengths.length > 5 && (
              <div className="flex justify-end mt-4">
                <Buttons
                  className="text-sm font-semibold hover:underline"
                  style={{
                    color: "#2563EB",
                    background: "transparent",
                    border: "none",
                  }}
                  onClick={() => setShowStrengthsModal(true)}
                >
                  Read More &gt;
                </Buttons>
              </div>
            )}
          </div>

          <div
            className="bg-white rounded-2xl p-6 flex flex-col"
            style={cardStyle}
          >
            <h4
              className="text-base md:text-lg font-semibold mb-3 text-center sm:text-left"
              style={{ color: "#0F172A" }}
            >
              Strengths Provided by Student
            </h4>

            <ul className="space-y-3">
              {customStrengths.length > 0 ? (
                customStrengths.map((item, idx) => (
                  <li key={`${item}-${idx}`}>
                    <div
                      className="rounded-lg p-3 text-sm"
                      style={{
                        border: "0.5px solid #E2E8F0",
                        color: "#475569",
                        background: "#F8FAFC",
                      }}
                    >
                      {item}
                    </div>
                  </li>
                ))
              ) : (
                <div
                  className="text-sm text-center mt-3"
                  style={{ color: "#94A3B8" }}
                >
                  No strengths added
                </div>
              )}
            </ul>
          </div>
        </div>

        <CareerRecommendations
          sessionId={parsedSessionId}
          onSelect={handleCareerClick}
        />

        <StudentReportValidation
          reportId={reportId ? Number(reportId) : undefined}
          sessionId={parsedSessionId}
          role="student"
          studentName={studentName}
          studentId={studentId ? Number(studentId) : undefined}
          onValidate={handleValidate}
          onRequestReview={handleRequestReview}
        />

        <StudentViewNotesModal
          isOpen={showNotesModal}
          onClose={() => setShowNotesModal(false)}
          studentId={studentId ? Number(studentId) : undefined}
        />

        {selectedCareer && (
          <CareerDetailModal
            career={selectedCareer}
            onClose={() => setSelectedCareer(null)}
          />
        )}

        <ValidationModal
          isOpen={showValidation}
          onClose={() => setShowValidation(false)}
        />

        <StrengthsModal
          isOpen={showStrengthsModal}
          onClose={() => setShowStrengthsModal(false)}
          strengths={uniqueStrengths}
        />
      </div>
    </StudentLayout>
  );
};

export default ReportDetail;
