import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";

import { useLogoutUserMutation, authApi } from "../redux/services/authApi";
import {
  assessmentApi,
  useFetchAssessmentStatusQuery,
  useSubmitAllSectionTimesMutation,
  useFetchCTestDetailsQuery,
  useFetchITestDetailsQuery,
  useFetchATestDetailsQuery,
} from "../redux/services/assessmentApi";
import {
  startLogout,
  userLogout,
} from "../redux/reducers/userInfo/userInfoSlice";
import {
  useFetchCTestQuestionsQuery,
  useFetchITestQuestionsQuery,
  useFetchATestQuestionsQuery,
  useFetchCTieBreakerQuestionsMutation,
} from "../redux/services/testApi";
import { useFinalizeCTestSectionMutation } from "../redux/services/studentApi";

import { useAssessmentState } from "../hooks/useAssessmentState";
import { useAssessmentMutations } from "../hooks/useAssessmentMutations";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";

import StudentLayout from "./StudentLayout";
import AssessmentTestScreen from "../pages/student/assessment/AssessmentTestScreen";
import AssessmentSelectScreen from "../pages/student/assessment/AssessmentSelectScreen";
import ThankYouScreen from "./Ui/ThankYouScreen";
import AssessmentSummary from "./assessment/AssessmentSummary";

const AssessmentWrapper = ({
  isResume = false,
  preSelectedAssessment = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [logout] = useLogoutUserMutation();
  const sessionId = location.state?.sessionId;
  const { isLoggedIn } = useSelector((state) => state.userInfo);
  const { handleError } = useApiErrorHandling();

  const [normalizedTests, setNormalizedTests] = useState([]);
  const [isTieBreaker, setIsTieBreaker] = useState(false);
  const [localCTestDetails, setLocalCTestDetails] = useState(null);

  // Global unauthorized handler (should be moved to baseQuery ideally)
  useEffect(() => {
    const unsubscribe = assessmentApi.middleware(
      (store) => (next) => (action) => {
        if (action?.error?.status === 401 || action?.payload?.status === 401) {
          setNormalizedTests([]);
          dispatch(startLogout());
          dispatch(authApi.util.resetApiState());
          dispatch(profileApi.util.resetApiState());
          dispatch(assessmentApi.util.resetApiState());
          dispatch(userLogout());
          navigate("/", { replace: true });
          return;
        }
        return next(action);
      },
    );
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch, navigate]);

  // Fetch main data
  const { data: assessmentStatus, isLoading: statusLoading } =
    useFetchAssessmentStatusQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const { data: cTestData, isLoading: cTestLoading } =
    useFetchCTestQuestionsQuery(sessionId ? { sessionId } : skipToken);

  const { data: iTestData, isLoading: iTestLoading } =
    useFetchITestQuestionsQuery(sessionId ? { sessionId } : skipToken);

  const { data: aTestData, isLoading: aTestLoading } =
    useFetchATestQuestionsQuery(sessionId ? { sessionId } : skipToken);

  const [fetchCTieBreakerQuestions] = useFetchCTieBreakerQuestionsMutation();

  // NEW DETAIL QUERIES (for total_assigned, answered, etc.)
  const { data: cTestDetails, refetch: refetchCTestDetails } =
    useFetchCTestDetailsQuery({ sessionId });
  const { data: iTestDetails } = useFetchITestDetailsQuery({ sessionId });
  const { data: aTestDetails } = useFetchATestDetailsQuery({ sessionId });

  // Sync API data with local state
  useEffect(() => {
    if (cTestDetails) {
      setLocalCTestDetails(cTestDetails);
    }
  }, [cTestDetails]);

  const shouldReset = location.state?.reset;

  const {
    step,
    setStep,
    instructionTime,
    setInstructionTime,
    currentTest,
    setCurrentTest,
    currentQuestion,
    setCurrentQuestion,
    timeLeft,
    answers,
    setAnswers,
    selectedAnswer,
    setSelectedAnswer,
    selectedAssessment,
    setSelectedAssessment,
    hasInteracted,
    setHasInteracted,
    showConfirmModal,
    setShowConfirmModal,
    isSubmittingAssessment,
    setIsSubmittingAssessment,
    showThankYou,
    setShowThankYou,
    completedTestType,
    setCompletedTestType,
    questionStartTime,
    setQuestionStartTime,
    sectionTimes,
    setSectionTimes,
    questionTimes,
    setQuestionTimes,
    resetState,
    SECTION_TIMES_KEY,
    QUESTION_TIMES_KEY,
    CURRENT_TEST_KEY,
  } = useAssessmentState(
    isResume,
    preSelectedAssessment,
    sessionId,
    normalizedTests,
    shouldReset,
  );

  const { handleAssessmentSubmit, submitAnswer } = useAssessmentMutations(
    sessionId,
    SECTION_TIMES_KEY,
    QUESTION_TIMES_KEY,
    CURRENT_TEST_KEY,
    sectionTimes,
  );

  const [submitAllSectionTimes] = useSubmitAllSectionTimesMutation();
  const [finalizeCTestSection] = useFinalizeCTestSectionMutation();

  const handleSectionComplete = async (sectionName, time) => {
    if (!sessionId) return;
    if (time !== undefined) {
      let apiSectionName = sectionName;
      if (sectionName === "personality-test")
        apiSectionName = "personality-test";
      else if (sectionName === "interest-test")
        apiSectionName = "interest-test";
      else if (sectionName === "aptitude-test")
        apiSectionName = "aptitude-test";

      try {
        await submitAllSectionTimes({
          session_id: sessionId,
          timetaken: [
            { section_name: apiSectionName, time_taken_seconds: time },
          ],
        }).unwrap();

        if (apiSectionName === "personality-test") {
          await finalizeCTestSection({ session_id: sessionId }).unwrap();
        }
      } catch (err) {
        handleError(err);
      }
    }
  };

  const [resumeMessage, setResumeMessage] = useState("");
  const [resumeSection, setResumeSection] = useState(null);

  useEffect(() => {
    const loadAssessmentData = async () => {
      if (isResume && assessmentStatus) {
        const sections = assessmentStatus.sections || [];
        const cTestCompleted =
          sections.find((s) => s.section_name === "personality-test")
            ?.is_completed || false;
        const iTestCompleted =
          sections.find((s) => s.section_name === "interest-test")
            ?.is_completed || false;
        const aTestCompleted =
          sections.find((s) => s.section_name === "aptitude-test")
            ?.is_completed || false;

        if (cTestCompleted && iTestCompleted && aTestCompleted) {
          setStep("summary");
          return;
        }

        if (sessionId && !location.state?.testType) {
          let nextTestType = null;
          if (!cTestCompleted) nextTestType = "personality-test";
          else if (!iTestCompleted) nextTestType = "interest-test";
          else if (!aTestCompleted) nextTestType = "aptitude-test";

          if (nextTestType) {
            navigate("/student/assessment-instruction", {
              state: {
                testType: nextTestType,
                sessionId,
                isResume,
                reset: location.state?.reset,
              },
              replace: true,
            });
          } else {
            setStep("summary");
          }
          return;
        }

        const tests = [];

        if (!cTestCompleted) {
          const hasTieBreaker = assessmentStatus.has_tie_breaker || false;
          const tieBreakerCompleted =
            assessmentStatus.tie_breaker_completed || false;
          const shouldReset = location.state?.reset;
          const isInTieBreakerPhase = hasTieBreaker && !tieBreakerCompleted;
          const canReset = !isInTieBreakerPhase;

          if (shouldReset && canReset) {
            if (cTestData && cTestData.length > 0) {
              tests.push({
                name: "Personality Test",
                description: "...",
                timePerQuestion: 30,
                questions: cTestData.map((q) => ({
                  question: q.question_text,
                  options: [q.option_a, q.option_b].filter(Boolean),
                  question_id: q.question_id,
                  isTieBreaker: false,
                })),
              });
            }
          } else if (shouldReset && isInTieBreakerPhase) {
            try {
              const response = await fetchCTieBreakerQuestions({
                sessionId,
              }).unwrap();
              if (Array.isArray(response) && response.length > 0) {
                tests.push({
                  name: "Personality Test",
                  description: "...",
                  timePerQuestion: 30,
                  questions: response.map((q) => ({
                    question: q.question_text,
                    options: [q.option_a, q.option_b].filter(Boolean),
                    question_id: q.question_id,
                    isTieBreaker: true,
                  })),
                });
              }
            } catch (err) {
              handleError(err);
            }
          } else {
            if (isInTieBreakerPhase) {
              try {
                const response = await fetchCTieBreakerQuestions({
                  sessionId,
                }).unwrap();
                if (Array.isArray(response) && response.length > 0) {
                  tests.push({
                    name: "Personality Test",
                    description: "...",
                    timePerQuestion: 30,
                    questions: response.map((q) => ({
                      question: q.question_text,
                      options: [q.option_a, q.option_b].filter(Boolean),
                      question_id: q.question_id,
                      isTieBreaker: true,
                    })),
                  });
                }
              } catch (err) {
                handleError(err);
              }
            } else if (cTestData && cTestData.length > 0) {
              tests.push({
                name: "Personality Test",
                description: "...",
                timePerQuestion: 30,
                questions: cTestData.map((q) => ({
                  question: q.question_text,
                  options: [q.option_a, q.option_b].filter(Boolean),
                  question_id: q.question_id,
                  isTieBreaker: false,
                })),
              });
            } else if (hasTieBreaker && !cTestLoading) {
              try {
                const response = await fetchCTieBreakerQuestions({
                  sessionId,
                }).unwrap();
                if (Array.isArray(response) && response.length > 0) {
                  tests.push({
                    name: "Personality Test",
                    description: "...",
                    timePerQuestion: 30,
                    questions: response.map((q) => ({
                      question: q.question_text,
                      options: [q.option_a, q.option_b].filter(Boolean),
                      question_id: q.question_id,
                      isTieBreaker: true,
                    })),
                  });
                }
              } catch (err) {
                handleError(err);
              }
            }
          }
        }

        if (!iTestCompleted && iTestData) {
          tests.push({
            name: "Interest Test",
            description: "...",
            timePerQuestion: 30,
            questions: iTestData.map((q) => ({
              question: q.question_text,
              options: [
                "Strongly Like",
                "Like",
                "Unsure",
                "Dislike",
                "Strongly Dislike",
              ],
              question_id: q.question_id,
            })),
          });
        }

        if (!aTestCompleted && aTestData) {
          tests.push({
            name: "Aptitude Test",
            timePerQuestion: 60,
            questions: aTestData.map((q) => ({
              question: q.question_text,
              options: [q.option_a, q.option_b, q.option_c, q.option_d].filter(
                Boolean,
              ),
              question_id: q.question_id,
              resource_url: q.resource_url || "",
              que_title: q.que_title || "",
              que_para: q.que_para || "",
              que_bullet: q.que_bullet || [],
            })),
          });
        }

        setNormalizedTests(tests);
        setCurrentTest(0);
        setCurrentQuestion(0);
        setShowThankYou(false);
      }
    };

    loadAssessmentData();
  }, [
    isResume,
    assessmentStatus,
    cTestData,
    iTestData,
    aTestData,
    cTestDetails,
    setStep,
    setNormalizedTests,
    setCurrentTest,
    setCurrentQuestion,
    setResumeMessage,
    setShowThankYou,
    setCompletedTestType,
    setResumeSection,
    sessionId,
    location.state,
    navigate,
    fetchCTieBreakerQuestions,
    toast,
    cTestLoading,
  ]);

  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      toast.error("Copying is not allowed during the assessment.");
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      toast.error("Right-click is not allowed during the assessment.");
    };

    window.addEventListener("copy", handleCopy);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (step === "assessment" && hasInteracted) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? Your progress may not be saved.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [step, hasInteracted]);

  useEffect(() => {
    if (assessmentStatus && assessmentStatus.sections) {
      const c = assessmentStatus.sections.find(
        (s) => s.section_name === "personality-test",
      )?.is_completed;
      const i = assessmentStatus.sections.find(
        (s) => s.section_name === "interest-test",
      )?.is_completed;
      const a = assessmentStatus.sections.find(
        (s) => s.section_name === "aptitude-test",
      )?.is_completed;
      if (c && i && a) setStep("summary");
    }
  }, [assessmentStatus]);

  useEffect(() => {
    if (step === "summary") {
      const autoSubmit = async () => {
        if (!isSubmittingAssessment) {
          setIsSubmittingAssessment(true);
          await handleAssessmentSubmit();
          setIsSubmittingAssessment(false);
        }
      };
      autoSubmit();
    }
  }, [step]);

  const currentTestData = normalizedTests[currentTest] || { questions: [] };
  const currentQuestionData = currentTestData.questions[currentQuestion] || {};

  const handleAnswerSelect = (answer) => {
    setHasInteracted(true);
    setSelectedAnswer(answer);
  };

  const getCurrentTestType = () => {
    const testName = currentTestData.name;
    if (testName === "Personality Test") return "personality-test";
    if (testName === "Interest Test") return "interest-test";
    if (testName === "Aptitude Test") return "aptitude-test";
    return null;
  };

  const handleNext = async () => {
    if (!selectedAnswer)
      return toast.error("Please select an answer before proceeding.");

    const timeSpent = Date.now() - questionStartTime;
    const testType = getCurrentTestType();
    const newTotalTime =
      (sectionTimes[testType] || 0) + Math.ceil(timeSpent / 1000);

    setSectionTimes((prev) => ({ ...prev, [testType]: newTotalTime }));

    const currentQuestions = normalizedTests[currentTest]?.questions || [];
    const isLastQuestionInArray =
      currentQuestion === currentQuestions.length - 1;
    const isTieBreaker = currentQuestionData.isTieBreaker || false;

    const success = await submitAnswer(
      testType,
      currentQuestionData,
      selectedAnswer,
      testType === "personality-test" ? false : isLastQuestionInArray,
      false,
      newTotalTime,
    );
    if (!success) return;

    if (isLastQuestionInArray) {
      if (testType === "personality-test" && !isTieBreaker) {
        try {
          const response = await fetchCTieBreakerQuestions({
            sessionId,
          }).unwrap();
          if (Array.isArray(response) && response.length > 0) {
            if (
              response.every(
                (q) => q.question_text && (q.option_a || q.option_b),
              )
            ) {
              const tieBreakers = response.map((q) => ({
                question: q.question_text,
                options: [q.option_a, q.option_b].filter(Boolean),
                question_id: q.question_id,
                isTieBreaker: true,
              }));
              const updatedTests = [...normalizedTests];
              updatedTests[currentTest] = {
                ...updatedTests[currentTest],
                questions: [
                  ...updatedTests[currentTest].questions,
                  ...tieBreakers,
                ],
              };
              setNormalizedTests(updatedTests);
              setIsTieBreaker(true);

              if (localCTestDetails) {
                setLocalCTestDetails({
                  ...localCTestDetails,
                  total_assigned:
                    localCTestDetails.total_assigned + tieBreakers.length,
                });
              }

              setCurrentQuestion(currentQuestion + 1);
              return;
            }
          }
        } catch (err) {
          handleError(err);
        }
      }

      await handleSectionComplete(testType, newTotalTime);

      if (currentTest < normalizedTests.length - 1) {
        setCompletedTestType(testType);
        setShowThankYou(true);
      } else {
        setStep("summary");
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (step === "instructions") setStep("select-assessment");
    else if (step === "assessment") setStep("instructions");
    else navigate("/student/dashboard");
  };

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  if (statusLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );

  if (showThankYou) {
    return (
      <ThankYouScreen
        onContinue={() => {
          setShowThankYou(false);
          if (currentTest < normalizedTests.length - 1) {
            setCurrentTest(currentTest + 1);
            setCurrentQuestion(0);
          } else setStep("summary");
        }}
        completedTest={completedTestType}
        resumeMessage={resumeMessage}
      />
    );
  }

  const testType = getCurrentTestType();
  let totalAssigned = 0;
  let answeredCount = 0;

  if (testType === "personality-test" && localCTestDetails) {
    totalAssigned =
      localCTestDetails.total_assigned || currentTestData.questions.length;
    answeredCount = localCTestDetails.answered || 0;
  } else if (testType === "interest-test" && iTestDetails) {
    totalAssigned =
      iTestDetails.total_assigned || currentTestData.questions.length;
    answeredCount = iTestDetails.answered || 0;
  } else if (testType === "aptitude-test" && aTestDetails) {
    totalAssigned =
      aTestDetails.total_assigned || currentTestData.questions.length;
    answeredCount = aTestDetails.answered || 0;
  } else {
    totalAssigned = currentTestData.questions.length;
  }

  switch (step) {
    case "select-assessment":
      return (
        <StudentLayout>
          <AssessmentSelectScreen
            onSelectAssessment={(assessment) => {
              const testType = assessment.id;
              navigate("/student/assessment-instruction", {
                state: { testType, sessionId },
              });
            }}
          />
        </StudentLayout>
      );

    case "summary":
      return (
        <AssessmentSummary
          isSubmitting={isSubmittingAssessment}
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          onBack={handleBack}
        />
      );

    case "assessment":
      return (
        <AssessmentTestScreen
          currentTestData={currentTestData}
          currentQuestionData={currentQuestionData}
          totalQuestions={totalAssigned}
          currentQuestion={answeredCount + currentQuestion}
          isTieBreaker={currentQuestionData.isTieBreaker}
          timeLeft={timeLeft}
          selectedAnswer={selectedAnswer}
          handlePrevious={() => {
            if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
          }}
          description={currentTestData.description}
          que_bullet={currentQuestionData.que_bullet || []}
          que_para={currentQuestionData.que_para || ""}
          que_title={currentQuestionData.que_title || ""}
          handleNext={handleNext}
          handleAnswerSelect={handleAnswerSelect}
          handleBack={handleBack}
          formatTime={formatTime}
          getProgressPercentage={() =>
            ((answeredCount + currentQuestion + 1) / totalAssigned) * 100
          }
          resourceUrl={currentQuestionData.resource_url}
          warningTimeThreshold={
            currentTestData.name === "Interest Test" ? 3 : 5
          }
          testType={getCurrentTestType()}
          shouldReset={shouldReset}
        />
      );

    default:
      return <div>Error: Unknown step.</div>;
  }
};

export default AssessmentWrapper;
