import {
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Flag,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useReportAssessmentIssueMutation } from "../../../redux/services/assessmentApi";
import { useLocation } from "react-router-dom";
import Buttons from "../../../components/Ui/Buttons";
import PropTypes from "prop-types";
import { useApiErrorHandling } from "../../../hooks/useApiErrorHandling";

const ISSUE_TYPES = [
  "Technical Glitch",
  "Content Error",
  "Timing Issue",
  "Other",
];

const AssessmentTestScreen = ({
  currentTestData,
  currentQuestionData,
  totalQuestions,
  currentQuestion,
  isTieBreaker,
  selectedAnswer,
  handleNext,
  handleAnswerSelect,
  que_bullet,
  que_para,
  que_title,
  formatTime,
  getProgressPercentage,
  resourceUrl,
  testType,
}) => {
  const location = useLocation();
  const sessionId = location.state?.sessionId;
  const [showReportModal, setShowReportModal] = useState(false);
  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [issueDescription, setIssueDescription] = useState("");
  const { handleError } = useApiErrorHandling();

  const [reportAssessmentIssue, { isLoading: isReporting }] =
    useReportAssessmentIssueMutation();

  const handleSubmitIssue = async () => {
    if (!issueType || !issueDescription.trim()) {
      toast.error("Please select issue type and fill in the description.");
      return;
    }
    if (issueDescription.trim().length < 20) {
      toast.error("Description should have at least 20 characters.");
      return;
    }
    if (!sessionId || !currentQuestionData.question_id) {
      toast.error("Session or question info missing.");
      return;
    }
    try {
      await reportAssessmentIssue({
        session_id: sessionId,
        issue_type: issueType,
        description: issueDescription,
        question_id: currentQuestionData.question_id,
      }).unwrap();
      toast.success("Issue submitted successfully!");
      setShowReportModal(false);
      setIssueType(ISSUE_TYPES[0]);
      setIssueDescription("");
    } catch (err) {
      handleError(err);
    }
  };

  const [localTimeLeft, setLocalTimeLeft] = useState(
    currentTestData.timePerQuestion || 60,
  );

  useEffect(() => {
    setLocalTimeLeft(currentTestData.timePerQuestion || 60);
  }, [currentQuestion, currentTestData.timePerQuestion]);

  useEffect(() => {
    let timer;
    if (localTimeLeft > 0) {
      timer = setTimeout(() => setLocalTimeLeft((prev) => prev - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [localTimeLeft]);

  const getQuestionDisplay = () => {
    const current = currentQuestion + 1;
    const total = totalQuestions;
    const prefix = isTieBreaker ? "Tie-Breaker " : "";
    return `${prefix}Question ${current}/${total}`;
  };

  const handleNextWithCounter = () => {
    handleNext();
    setLocalTimeLeft(currentTestData.timePerQuestion || 60);
  };

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <div className="no-copy">
      <div
        className="max-w-3xl mx-auto bg-white rounded-xl p-4 mt-3"
        style={cardStyle}
      >
        <div className="max-w-6xl mx-auto">
          {/* Top: title, description, timer, progress */}
          <div className="bg-white rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1
                  className="text-base xl:text-xl font-bold"
                  style={{ color: "#0F172A" }}
                >
                  {currentTestData.name}
                </h1>
                <p
                  className="text-sm md:text-base"
                  style={{ color: "#64748B" }}
                >
                  {testType === "personality-test" && (
                    <>
                      Select 1 of the 2 choices for each situation.
                      <span>
                        <br /> Remember there are NO right or wrong answers
                        here.
                      </span>
                    </>
                  )}
                  {testType === "interest-test" && (
                    <>
                      Imagine you have a chance to try different activities for
                      1 day in your life.
                      <br />
                      For each activity displayed, share your eagerness to try
                      it (Completely Like → Completely Dislike).
                    </>
                  )}
                  {testType === "aptitude-test" && (
                    <>
                      Select 1 of the 4 choices.
                      <br />
                      Remember these are aptitude questions which DO have right
                      and wrong answers.
                    </>
                  )}
                </p>
              </div>
              <div className="text-right">
                <div
                  className="flex items-center gap-2 mb-1 font-semibold"
                  style={{ color: localTimeLeft === 0 ? "#DC2626" : "#2563EB" }}
                >
                  <Clock className="h-4 w-4" />
                  <span className="font-mono text-sm md:text-lg">
                    {formatTime(localTimeLeft)}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="w-full rounded-full h-1.5"
              style={{ background: "#E2E8F0" }}
            >
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${getProgressPercentage()}%`,
                  background: "#2563EB",
                }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-xl p-4 mb-5" style={cardStyle}>
            <div className="mb-5">
              {que_title && (
                <div
                  className="mb-1 font-semibold text-base"
                  style={{ color: "#0F172A" }}
                >
                  {que_title}
                </div>
              )}
              {que_para && (
                <div
                  className="mb-2 text-sm md:text-base py-2 px-3 rounded"
                  style={{
                    background: "#F8FAFC",
                    color: "#475569",
                    borderLeft: "3px solid #2563EB",
                  }}
                >
                  {que_para}
                </div>
              )}
              <h2
                className="text-base lg:text-lg font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                {currentQuestionData.question}
              </h2>
              {que_bullet &&
                Array.isArray(que_bullet) &&
                que_bullet.length > 0 && (
                  <ul
                    className="mb-2 list-disc list-inside text-sm"
                    style={{ color: "#475569" }}
                  >
                    {que_bullet.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              {localTimeLeft <= 10 && (
                <div
                  className="flex items-center gap-1.5 mt-3"
                  style={{ color: "#DC2626" }}
                >
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Time is running out!
                  </span>
                </div>
              )}
              {resourceUrl && (
                <div className="flex justify-center mt-4 mb-4">
                  <img
                    src={resourceUrl}
                    alt="Question Resource"
                    style={{
                      width: 450,
                      height: 250,
                      objectFit: "contain",
                      borderRadius: 8,
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              {(currentQuestionData.options || []).map((option, index) => {
                const isSelected = selectedAnswer === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full text-left p-3 rounded-lg transition-all duration-150 text-sm"
                    style={
                      isSelected
                        ? {
                            border: "2px solid #2563EB",
                            background: "#EFF6FF",
                            color: "#2563EB",
                          }
                        : {
                            border: "2px solid #E2E8F0",
                            background: "white",
                            color: "#475569",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#94A3B8";
                        e.currentTarget.style.background = "#F8FAFC";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#E2E8F0";
                        e.currentTarget.style.background = "white";
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="xl:font-medium">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                      {isSelected && (
                        <CheckCircle
                          className="h-5 w-5"
                          style={{ color: "#2563EB" }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex justify-end">
            <div className="flex items-center justify-between w-full gap-3 flex-wrap">
              <Buttons
                onClick={() => setShowReportModal(true)}
                className="text-sm rounded-lg py-2 px-4 flex items-center gap-2 text-white"
                style={{ background: "#DC2626", border: "none" }}
              >
                <Flag className="w-4 h-4" />
                Report an Issue
              </Buttons>

              <div className="flex items-center gap-3">
                <div className="text-sm" style={{ color: "#64748B" }}>
                  {getQuestionDisplay()}
                </div>
                <Buttons
                  onClick={handleNextWithCounter}
                  disabled={!selectedAnswer}
                  aria-label="Go to next question"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: selectedAnswer ? "#2563EB" : "#CBD5E1",
                    color: "white",
                    border: "none",
                  }}
                >
                  Next Question
                  <ChevronRight className="h-4 w-4" />
                </Buttons>
              </div>
            </div>
          </div>
        </div>

        {showReportModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(15, 23, 42, 0.6)" }}
          >
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-2xl w-full max-w-md">
              <h2
                className="text-base md:text-lg font-semibold mb-4"
                style={{ color: "#0F172A" }}
              >
                Report an Issue
              </h2>
              <select
                className="w-full mb-3 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  border: "1px solid #E2E8F0",
                  background: "white",
                  color: "#0F172A",
                }}
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                {ISSUE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <textarea
                rows="4"
                placeholder="Describe the issue (at least 20 characters)..."
                className="w-full mb-4 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  border: "1px solid #E2E8F0",
                  background: "white",
                  color: "#0F172A",
                }}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <Buttons
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    border: "1px solid #E2E8F0",
                    color: "#475569",
                    background: "white",
                  }}
                >
                  Cancel
                </Buttons>
                <Buttons
                  onClick={handleSubmitIssue}
                  disabled={isReporting}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "#2563EB", border: "none" }}
                >
                  Submit
                </Buttons>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AssessmentTestScreen.propTypes = {
  currentTestData: PropTypes.object.isRequired,
  currentQuestionData: PropTypes.object.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  isTieBreaker: PropTypes.bool,
  selectedAnswer: PropTypes.string,
  handleNext: PropTypes.func.isRequired,
  handleAnswerSelect: PropTypes.func.isRequired,
  que_bullet: PropTypes.arrayOf(PropTypes.string),
  que_para: PropTypes.string,
  que_title: PropTypes.string,
  formatTime: PropTypes.func.isRequired,
  getProgressPercentage: PropTypes.func.isRequired,
  resourceUrl: PropTypes.string,
  testType: PropTypes.oneOf([
    "personality-test",
    "interest-test",
    "aptitude-test",
  ]).isRequired,
};

export default AssessmentTestScreen;
