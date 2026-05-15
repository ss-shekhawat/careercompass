import React, { useState, useEffect } from "react";
import StudentLayout from "../../components/StudentLayout";
import {
  FileBarChart,
  TrendingUp,
  Clock,
  ChevronRight,
  ArrowRight,
  X as CloseIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  useStartAssessmentMutation,
  useFetchAssessmentStatusQuery,
} from "../../redux/services/assessmentApi";
import {
  useGetProfileQuery,
  useGetDashboardStatsQuery,
  useGetDashboardOverviewQuery,
} from "../../redux/services/studentApi";
import { useGetNormalTestStatusQuery } from "../../redux/services/studentApi";
import { useSelector } from "react-redux";
import Buttons from "../../components/Ui/Buttons";
import { useApiErrorHandling } from "../../hooks/useApiErrorHandling";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const testId = useSelector((state) => state.userInfo.testId);
  const { handleError } = useApiErrorHandling();
  const [showAllPast, setShowAllPast] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

  const { data: statusData, refetch: refetchAssessmentStatus } =
    useFetchAssessmentStatusQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const { data: statsData, refetch: refetchStats } = useGetDashboardStatsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const { data: profile, refetch: refetchProfile } = useGetProfileQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const { data: normalTestStatus, refetch: refetchNormalTestStatus } =
    useGetNormalTestStatusQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const { data: dashboardOverview, refetch: refetchDashboardOverview } =
    useGetDashboardOverviewQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  useEffect(() => {
    if (statusData?.session_id) setSessionId(statusData.session_id);
  }, [statusData]);

  useEffect(() => {
    refetchStats();
    refetchProfile();
    refetchNormalTestStatus();
    refetchDashboardOverview();
  }, []);

  const [startAssessment, { data, isLoading, isSuccess, error }] =
    useStartAssessmentMutation();

  useEffect(() => {
    if (isSuccess && data?.session_id) setSessionId(data.session_id);
  }, [isSuccess, data]);

  const progressSteps = [
    {
      name: "Profile Test",
      completed: normalTestStatus?.student_form?.is_complete || false,
    },
    { name: "Personality Test", completed: false },
    { name: "Interest Test", completed: false },
    { name: "Aptitude Test", completed: false },
  ];

  if (statusData && statusData.sections) {
    progressSteps[1].completed =
      statusData.sections.find((s) => s.section_name === "personality-test")
        ?.is_completed || false;
    progressSteps[2].completed =
      statusData.sections.find((s) => s.section_name === "interest-test")
        ?.is_completed || false;
    progressSteps[3].completed =
      statusData.sections.find((s) => s.section_name === "aptitude-test")
        ?.is_completed || false;
  }

  const completedSteps = progressSteps.filter((step) => step.completed).length;
  const progressPercentage = (completedSteps / progressSteps.length) * 100;

  const hasAssessmentProduct =
    profile?.product_internal_code === "ASSESSMENT" ||
    profile?.product_tier === "ASSESSMENT" ||
    profile?.product_internal_code === "TEST_COUNSELLING" ||
    profile?.product_tier === "TEST_COUNSELLING";
  const isStartDisabled =
    isLoading ||
    progressPercentage === 100 ||
    (!testId && !sessionId && !hasAssessmentProduct);

  const handleStartAssessment = async () => {
    if (progressPercentage > 0 && progressPercentage < 100) {
      setShowResumeModal(true);
      return;
    }
    try {
      const payload = testId ? { test_id: testId } : {};
      const response = await startAssessment(payload).unwrap();
      setSessionId(response.session_id);
      const studentComplete = normalTestStatus?.student_form?.is_complete;
      const parentComplete = normalTestStatus?.parent_form?.is_complete;
      if (!studentComplete && !parentComplete) {
        navigate("/student/profile-questions", {
          state: { sessionId: response.session_id },
        });
      } else {
        navigate("/student/resume-assessment", {
          state: { sessionId: response.session_id },
        });
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleResumeAssessment = async (resumeType) => {
    setIsResuming(true);
    try {
      const payload = { test_id: testId, resume_type: resumeType };
      const response = await startAssessment(payload).unwrap();
      setSessionId(response.session_id);
      setShowResumeModal(false);
      refetchStats();
      refetchAssessmentStatus();
      refetchNormalTestStatus();
      if (resumeType === "start_from_beginning") {
        navigate("/student/assessment-instruction", {
          state: {
            test_id: testId,
            testType: "personality-test",
            sessionId: response.session_id,
          },
        });
      } else if (resumeType === "start_from_section") {
        navigate("/student/resume-assessment", {
          state: { sessionId: response.session_id, reset: true },
        });
      } else if (resumeType === "resume_exact") {
        navigate("/student/resume-assessment", {
          state: { sessionId: response.session_id },
        });
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsResuming(false);
    }
  };

  return (
    <StudentLayout title="Dashboard">
      <div className="mx-auto">
        {/* Welcome */}
        <div className="mb-6 md:ml-1">
          <h1
            className="text-xl md:text-2xl font-bold"
            style={{ color: "#0F172A" }}
          >
            Welcome, {profile?.full_name || "Student"} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            Continue your journey to discover your perfect career path.
          </p>
        </div>

        {/* Progress Section — BLUE GRADIENT */}
        <div
          className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
          }}
        >
          {/* Decorative compass */}
          <div
            className="absolute"
            style={{
              top: "-30px",
              right: "-30px",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          >
            <svg width="180" height="180" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <polygon
                points="40,16 48,36 64,40 48,44 40,64 32,44 16,40 32,36"
                fill="white"
              />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 relative z-10">
            <div>
              <p
                className="font-semibold mb-1.5"
                style={{
                  color: "#FBBF24",
                  fontSize: "10px",
                  letterSpacing: "1.2px",
                }}
              >
                ASSESSMENT PROGRESS
              </p>
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                {progressPercentage === 0
                  ? "Let's get started"
                  : progressPercentage < 50
                    ? `Nice start! ${Math.round(progressPercentage)}% complete`
                    : progressPercentage < 100
                      ? `Keep going! ${Math.round(progressPercentage)}% through`
                      : "🎉 100% complete — well done!"}
              </h2>
              <Buttons
                onClick={handleStartAssessment}
                disabled={isStartDisabled}
                className="rounded-lg font-semibold px-5 py-2 text-sm inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "#FBBF24",
                  color: "#78350F",
                  border: "none",
                }}
              >
                {isLoading
                  ? "Starting..."
                  : progressPercentage === 100
                    ? "Test Completed"
                    : progressPercentage > 0
                      ? "Resume Assessment"
                      : "Start Assessment"}
                {progressPercentage < 100 && !isLoading && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Buttons>

              {progressPercentage === 100 &&
                (profile?.product_internal_code === "ASSESSMENT" ||
                  profile?.product_tier === "ASSESSMENT") && (
                  <div className="mt-3 text-sm">
                    <p style={{ color: "#BFDBFE" }}>
                      Want personalised counselling?
                    </p>
                    <Link
                      to="/student/subscription"
                      className="inline-block mt-2 px-3 py-1.5 rounded-md font-semibold text-sm"
                      style={{
                        background: "white",
                        color: "#2563EB",
                        textDecoration: "none",
                      }}
                    >
                      Upgrade for Counselling
                    </Link>
                  </div>
                )}

              {error && (
                <div className="mt-3 text-sm" style={{ color: "#FECACA" }}>
                  Failed to start assessment. Please try again.
                </div>
              )}
            </div>

            <div className="text-right md:text-right">
              <div className="text-2xl md:text-3xl font-bold">
                {completedSteps}/{progressSteps.length}
              </div>
              <div className="text-sm" style={{ color: "#BFDBFE" }}>
                Steps Done
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full rounded-full h-2 mb-4"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
            {progressSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: step.completed
                      ? "#FBBF24"
                      : "rgba(255,255,255,0.3)",
                  }}
                />
                <span
                  className="text-xs md:text-sm"
                  style={{ color: "#BFDBFE" }}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Modal */}
        {showResumeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15, 23, 42, 0.6)" }}
          >
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative">
              <Buttons
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                onClick={() => setShowResumeModal(false)}
                aria-label="Close"
                style={{
                  background: "#F1F5F9",
                  color: "#475569",
                  border: "none",
                }}
              >
                <CloseIcon className="w-4 h-4" />
              </Buttons>
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                Resume Assessment
              </h2>
              <p className="mb-5 text-sm" style={{ color: "#64748B" }}>
                How would you like to continue your assessment?
              </p>
              <div className="flex flex-col gap-2.5">
                <Buttons
                  onClick={() => handleResumeAssessment("resume_exact")}
                  disabled={isResuming}
                  className="px-4 py-2.5 rounded-lg font-semibold text-sm text-left"
                  style={{
                    background: "#EFF6FF",
                    color: "#2563EB",
                    border: "1px solid #DBEAFE",
                  }}
                >
                  {isResuming ? "Loading..." : "Resume where you left off"}
                </Buttons>
                <Buttons
                  onClick={() => handleResumeAssessment("start_from_section")}
                  disabled={isResuming}
                  className="px-4 py-2.5 rounded-lg font-semibold text-sm text-left"
                  style={{
                    background: "#EFF6FF",
                    color: "#2563EB",
                    border: "1px solid #DBEAFE",
                  }}
                >
                  {isResuming ? "Loading..." : "Resume beginning of section"}
                </Buttons>
                <Buttons
                  onClick={() => handleResumeAssessment("start_from_beginning")}
                  disabled={isResuming}
                  className="px-4 py-2.5 rounded-lg font-semibold text-sm text-left"
                  style={{
                    background: "#FEF2F2",
                    color: "#DC2626",
                    border: "1px solid #FECACA",
                  }}
                >
                  {isResuming ? "Loading..." : "Start from Beginning"}
                </Buttons>
              </div>
            </div>
          </div>
        )}

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Reports Card */}
          <Link
            to="/student/report"
            className="bg-white rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 group"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="p-2.5 rounded-lg"
                style={{ background: "#DBEAFE" }}
              >
                <FileBarChart
                  className="h-5 w-5"
                  style={{ color: "#2563EB" }}
                />
              </div>
              <ChevronRight
                className="h-5 w-5 transition-colors"
                style={{ color: "#94A3B8" }}
              />
            </div>
            <h3
              className="text-base font-semibold mb-1"
              style={{ color: "#0F172A" }}
            >
              View Reports
            </h3>
            <p className="text-sm" style={{ color: "#64748B" }}>
              Access your detailed assessment results and career
              recommendations.
            </p>
          </Link>

          {/* Stats Card */}
          <div
            className="bg-white rounded-xl p-5"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              className="text-base font-semibold mb-3"
              style={{ color: "#0F172A" }}
            >
              Your Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: "#DBEAFE" }}
                  >
                    <Clock className="h-4 w-4" style={{ color: "#2563EB" }} />
                  </div>
                  <span className="text-sm" style={{ color: "#475569" }}>
                    Total Time Spent
                  </span>
                </div>
                <span
                  className="font-semibold text-sm"
                  style={{ color: "#0F172A" }}
                >
                  {statsData?.total_time_spent_formatted ?? "0m"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: "#FEF3C7" }}
                  >
                    <TrendingUp
                      className="h-4 w-4"
                      style={{ color: "#B45309" }}
                    />
                  </div>
                  <span className="text-sm" style={{ color: "#475569" }}>
                    Tests Completed
                  </span>
                </div>
                <span
                  className="font-semibold text-sm"
                  style={{ color: "#0F172A" }}
                >
                  {statsData?.total_tests_completed ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Past Sessions */}
          <div
            className="bg-white rounded-xl p-5"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              className="text-base font-semibold mb-3"
              style={{ color: "#0F172A" }}
            >
              Past Sessions
            </h3>
            <div
              className="hidden md:grid grid-cols-3 text-xs font-semibold py-2 mb-2"
              style={{ color: "#64748B", borderBottom: "1px solid #E2E8F0" }}
            >
              <span>Date</span>
              <span className="text-center">Counsellor</span>
              <span className="text-center">Time</span>
            </div>
            <div className="space-y-2 md:space-y-0">
              {dashboardOverview?.past_sessions &&
              dashboardOverview.past_sessions.length > 0 ? (
                (showAllPast
                  ? dashboardOverview.past_sessions
                  : dashboardOverview.past_sessions.slice(0, 3)
                ).map((item, index) => (
                  <div
                    key={index}
                    className="block md:grid md:grid-cols-3 md:items-center gap-2 md:gap-0 p-3 md:p-2 md:py-2 rounded-lg md:rounded-none"
                    style={{
                      background: "#F8FAFC",
                      borderBottom: "1px solid #F1F5F9",
                    }}
                  >
                    <div className="flex justify-between md:block mb-1 md:mb-0">
                      <span
                        className="text-xs font-semibold md:hidden"
                        style={{ color: "#94A3B8" }}
                      >
                        Date
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#0F172A" }}
                      >
                        {item.session_date}
                      </span>
                    </div>
                    <div className="flex justify-between md:block md:text-center mb-1 md:mb-0">
                      <span
                        className="text-xs font-semibold md:hidden"
                        style={{ color: "#94A3B8" }}
                      >
                        Counsellor
                      </span>
                      <span className="text-sm" style={{ color: "#475569" }}>
                        {item.counsellor_name}
                      </span>
                    </div>
                    <div className="flex justify-between md:block md:text-center">
                      <span
                        className="text-xs font-semibold md:hidden"
                        style={{ color: "#94A3B8" }}
                      >
                        Time
                      </span>
                      <span className="text-sm" style={{ color: "#475569" }}>
                        {item.session_time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="text-center py-6 text-sm"
                  style={{ color: "#94A3B8" }}
                >
                  No past sessions yet
                </div>
              )}
            </div>
            {dashboardOverview?.past_sessions &&
              dashboardOverview.past_sessions.length > 3 && (
                <button
                  onClick={() => setShowAllPast(!showAllPast)}
                  className="mt-3 text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
                  style={{ color: "#2563EB" }}
                >
                  {showAllPast ? "Show Less" : "Show More"}
                </button>
              )}
          </div>

          {/* Upcoming Sessions */}
          <div
            className="bg-white rounded-xl p-5"
            style={{
              border: "0.5px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              className="text-base font-semibold mb-3"
              style={{ color: "#0F172A" }}
            >
              Upcoming Sessions
            </h3>
            <div
              className="hidden md:grid grid-cols-4 text-xs font-semibold py-2 mb-2 items-center"
              style={{ color: "#64748B", borderBottom: "1px solid #E2E8F0" }}
            >
              <span>Date</span>
              <span className="text-center">Counsellor</span>
              <span className="text-center">Time</span>
              <span className="text-center">Link</span>
            </div>
            <div className="space-y-2 md:space-y-0">
              {dashboardOverview?.upcoming_sessions &&
              dashboardOverview.upcoming_sessions.length > 0 ? (
                (showAllUpcoming
                  ? dashboardOverview.upcoming_sessions
                  : dashboardOverview.upcoming_sessions.slice(0, 3)
                ).map((item, index) => (
                  <div
                    key={index}
                    className="block md:grid md:grid-cols-4 md:items-center gap-2 md:gap-0 p-3 md:p-2 md:py-2 rounded-lg md:rounded-none"
                    style={{
                      background: "#F8FAFC",
                      borderBottom: "1px solid #F1F5F9",
                    }}
                  >
                    <div className="flex justify-between md:block mb-1 md:mb-0">
                      <span
                        className="text-xs font-semibold md:hidden"
                        style={{ color: "#94A3B8" }}
                      >
                        Date
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#0F172A" }}
                      >
                        {item.session_date}
                      </span>
                    </div>
                    <div className="flex justify-between md:block md:text-center mb-1 md:mb-0">
                      <span
                        className="text-xs font-semibold md:hidden"
                        style={{ color: "#94A3B8" }}
                      >
                        Counsellor
                      </span>
                      <span className="text-sm" style={{ color: "#475569" }}>
                        {item.counsellor_name}
                      </span>
                    </div>
                    <div className="flex justify-between md:block md:text-center mb-1 md:mb-0">
                      <span
                        className="text-xs font-semibold md:hidden"
                        style={{ color: "#94A3B8" }}
                      >
                        Time
                      </span>
                      <span className="text-sm" style={{ color: "#475569" }}>
                        {item.session_time}
                      </span>
                    </div>
                    <div className="flex justify-between md:block md:text-center">
                      <span
                        className="text-xs font-semibold md:hidden"
                        style={{ color: "#94A3B8" }}
                      >
                        Link
                      </span>
                      <span>
                        {item.meeting_link ? (
                          <a
                            href={item.meeting_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm underline font-semibold"
                            style={{
                              color: item.can_join ? "#2563EB" : "#94A3B8",
                              cursor: item.can_join ? "pointer" : "not-allowed",
                            }}
                            onClick={(e) =>
                              !item.can_join && e.preventDefault()
                            }
                            title={
                              item.can_join
                                ? "Join session"
                                : "Session not yet started"
                            }
                          >
                            Join
                          </a>
                        ) : (
                          <span
                            className="text-sm"
                            style={{ color: "#94A3B8" }}
                          >
                            —
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="text-center py-6 text-sm"
                  style={{ color: "#94A3B8" }}
                >
                  No upcoming sessions
                </div>
              )}
            </div>
            {dashboardOverview?.upcoming_sessions &&
              dashboardOverview.upcoming_sessions.length > 3 && (
                <button
                  onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                  className="mt-3 text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
                  style={{ color: "#2563EB" }}
                >
                  {showAllUpcoming ? "Show Less" : "Show More"}
                </button>
              )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
