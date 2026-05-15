import { useState, useEffect } from "react";
import StudentLayout from "../StudentLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import {
  useGetStudentStrengthsWeaknessesQuery,
  useGetStudentReportsQuery,
  useUpdateStudentReportStatusMutation,
  useGetCustomStrengthsMutation,
} from "../../redux/services/assessmentApi";
import Buttons from "../Ui/Buttons";
import { useApiErrorHandling } from "../../hooks/useApiErrorHandling";

const StrengthsSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleError } = useApiErrorHandling();

  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");

  const [responses, setResponses] = useState({});
  const [customStrength, setCustomStrength] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [finalMessageShown, setFinalMessageShown] = useState(false);

  const { data, isLoading, isError } =
    useGetStudentStrengthsWeaknessesQuery(sessionId);
  const { data: reportsData, isLoading: isReportsLoading } =
    useGetStudentReportsQuery();
  const [updateReportStatus] = useUpdateStudentReportStatusMutation();
  const [
    saveCustomStrength,
    { isLoading: isCustomSaving, isError: isCustomError },
  ] = useGetCustomStrengthsMutation();

  const strengthsData = data?.strengths
    ? data.strengths
        .slice(0, 5)
        .map((description, idx) => ({ id: idx + 1, description }))
    : [];

  const currentReport = reportsData?.find(
    (r) => String(r.session_id) === String(sessionId),
  );
  const reportId = currentReport?.report_id;

  const agreedCount = Object.values(responses).filter(
    (v) => v === "agree",
  ).length;
  const percentage = strengthsData.length
    ? (agreedCount / strengthsData.length) * 100
    : 0;

  const handleResponse = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const totalResponded = Object.keys(responses).length;
    if (totalResponded === 0) return;

    if (percentage >= 50) {
      setShowCustomInput(false);
      if (reportId && !isNaN(reportId)) {
        try {
          await updateReportStatus({
            reportId,
            payload: { status: "approved" },
          }).unwrap();
        } catch (err) {
          handleError(err);
        }
      }
      navigate("/student/report");
    } else {
      setShowCustomInput(true);
    }
  };

  const handleCustomSave = async () => {
    if (customStrength.trim()) {
      try {
        await saveCustomStrength({
          reportId,
          strengths: [customStrength.trim()],
        }).unwrap();
        setFinalMessageShown(true);
      } catch (err) {
        handleError(err);
      }
    }
  };

  useEffect(() => {
    if (percentage >= 50 && showCustomInput) setShowCustomInput(false);
  }, [percentage, showCustomInput]);

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <StudentLayout>
      <div
        className="bg-white p-6 md:p-8 rounded-2xl max-w-5xl mx-auto mt-2"
        style={cardStyle}
      >
        <h2
          className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-6 md:mb-8"
          style={{ color: "#0F172A" }}
        >
          Let us know how you feel about your top 5 strengths
        </h2>

        {isLoading && (
          <div
            className="text-center py-8 text-sm font-medium"
            style={{ color: "#2563EB" }}
          >
            Loading strengths...
          </div>
        )}
        {isError && (
          <div
            className="text-center py-8 text-sm font-medium"
            style={{ color: "#DC2626" }}
          >
            Failed to load strengths. Please try again.
          </div>
        )}

        {!isLoading && !isError && (
          <div
            className="overflow-x-auto rounded-lg"
            style={{ border: "0.5px solid #E2E8F0" }}
          >
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr style={{ background: "#2563EB", color: "white" }}>
                  <th className="px-5 py-3 text-left font-semibold">
                    Description
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Agree 👍
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Disagree 👎
                  </th>
                </tr>
              </thead>
              <tbody>
                {strengthsData.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors"
                    style={{
                      borderTop: "1px solid #E2E8F0",
                      background: "white",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F8FAFC")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    <td className="px-5 py-3" style={{ color: "#475569" }}>
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="radio"
                        name={`response-${item.id}`}
                        className="lg:w-4 lg:h-4 cursor-pointer"
                        style={{ accentColor: "#2563EB" }}
                        checked={responses[item.id] === "agree"}
                        onChange={() => handleResponse(item.id, "agree")}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="radio"
                        name={`response-${item.id}`}
                        className="lg:w-4 lg:h-4 cursor-pointer"
                        style={{ accentColor: "#DC2626" }}
                        checked={responses[item.id] === "disagree"}
                        onChange={() => handleResponse(item.id, "disagree")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!showCustomInput && !finalMessageShown && (
          <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm italic" style={{ color: "#64748B" }}>
              *All your strengths and improvement areas will be included in the
              detailed report.
            </p>
            <Buttons
              onClick={handleSubmit}
              disabled={isReportsLoading || !reportId}
              className="rounded-lg font-semibold px-5 py-2 text-sm text-white transition-all active:scale-[0.98] disabled:opacity-60"
              style={{ background: "#2563EB", border: "none" }}
            >
              {isReportsLoading
                ? "Loading..."
                : !reportId
                  ? "Report Not Found"
                  : "Submit"}
            </Buttons>
          </div>
        )}

        {showCustomInput && !finalMessageShown && (
          <div
            className="mt-8 p-5 rounded-xl"
            style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}
          >
            <label
              className="block mb-2.5 text-sm font-semibold"
              style={{ color: "#0F172A" }}
            >
              💬 Add your own strength:
            </label>
            <input
              type="text"
              value={customStrength}
              onChange={(e) => setCustomStrength(e.target.value)}
              placeholder="e.g. Fast Learner, Confident Speaker..."
              className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-150 text-sm"
              style={{
                border: "1px solid #E2E8F0",
                background: "white",
                color: "#0F172A",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #2563EB";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #E2E8F0";
                e.target.style.boxShadow = "none";
              }}
            />
            <div className="flex justify-end mt-3">
              <Buttons
                onClick={handleCustomSave}
                disabled={isCustomSaving}
                className="rounded-lg font-semibold px-5 py-2 text-sm text-white transition-all active:scale-[0.98] disabled:opacity-60"
                style={{ background: "#2563EB", border: "none" }}
              >
                {isCustomSaving ? "Saving..." : "Submit"}
              </Buttons>
            </div>
            {isCustomError && (
              <div className="mt-2 text-sm" style={{ color: "#DC2626" }}>
                Failed to save custom strength. Please try again.
              </div>
            )}
          </div>
        )}

        {finalMessageShown && (
          <div
            className="flex gap-2 mt-8 items-center text-sm md:text-base font-semibold italic"
            style={{ color: "#15803D" }}
          >
            <CheckCircle className="w-5 h-5" />
            Thank you for taking the test — your report will be ready within 24
            hours.
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StrengthsSelection;
