import { useState, useEffect, useCallback } from "react";

export const useAssessmentState = (isResume, preSelectedAssessment, sessionId, tests, reset) => {
  const STEP_KEY = sessionId ? `assessment_step_${sessionId}` : "assessment_step";
  const [step, setStep] = useState(() => {
    try {
      const stored = localStorage.getItem(STEP_KEY);
      return stored ? JSON.parse(stored) : (isResume ? "assessment" : "select-assessment");
    } catch (e) {
      console.error("Failed to parse STEP from localStorage:", e);
      return isResume ? "assessment" : "select-assessment";
    }
  });

  const [instructionTime, setInstructionTime] = useState(60);
  const CURRENT_TEST_KEY = sessionId
    ? `assessment_current_test_${sessionId}`
    : "assessment_current_test";

  const [currentTest, setCurrentTest] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENT_TEST_KEY);
      return stored ? JSON.parse(stored) : 0;
    } catch (e) {
      console.error("Failed to parse CURRENT_TEST from localStorage:", e);
      return 0;
    }
  });

  const CURRENT_QUESTION_KEY = sessionId
    ? `assessment_current_question_${sessionId}`
    : "assessment_current_question";

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENT_QUESTION_KEY);
      return stored ? JSON.parse(stored) : 0;
    } catch (e) {
      console.error("Failed to parse CURRENT_QUESTION from localStorage:", e);
      return 0;
    }
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState(preSelectedAssessment);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timeoutNotified, setTimeoutNotified] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const [reportError, setReportError] = useState("");
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [completedTestType, setCompletedTestType] = useState("");
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const SECTION_TIMES_KEY = sessionId
    ? `assessment_section_times_${sessionId}`
    : "assessment_section_times";

  const [sectionTimes, setSectionTimes] = useState(() => {
    try {
      const stored = localStorage.getItem(SECTION_TIMES_KEY);
      return stored ? JSON.parse(stored) : { "personality-test": 0, "interest-test": 0, "aptitude-test": 0 };
    } catch (e) {
      console.error("Failed to parse SECTION_TIMES from localStorage:", e);
      return { "personality-test": 0, "interest-test": 0, "aptitude-test": 0 };
    }
  });

  const QUESTION_TIMES_KEY = sessionId
    ? `assessment_question_times_${sessionId}`
    : "assessment_question_times";

  const [questionTimes, setQuestionTimes] = useState(() => {
    try {
      const stored = localStorage.getItem(QUESTION_TIMES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to parse QUESTION_TIMES from localStorage:", e);
      return {};
    }
  });


  const currentTestData = tests[currentTest] || { questions: [] };

  useEffect(() => {
    if (step === "assessment") {
      setTimeLeft(currentTestData.timePerQuestion || 60);
      setSelectedAnswer("");
      setTimeoutNotified(false);
      setQuestionStartTime(Date.now());
    }
  }, [currentTest, currentQuestion, step, currentTestData.timePerQuestion]);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem(SECTION_TIMES_KEY, JSON.stringify(sectionTimes));
    }
  }, [sectionTimes, SECTION_TIMES_KEY, sessionId]);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem(QUESTION_TIMES_KEY, JSON.stringify(questionTimes));
    }
  }, [questionTimes, QUESTION_TIMES_KEY, sessionId]);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem(CURRENT_TEST_KEY, JSON.stringify(currentTest));
    }
  }, [currentTest, CURRENT_TEST_KEY, sessionId]);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem(CURRENT_QUESTION_KEY, JSON.stringify(currentQuestion));
    }
  }, [currentQuestion, CURRENT_QUESTION_KEY, sessionId]);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem(STEP_KEY, JSON.stringify(step));
    }
  }, [step, STEP_KEY, sessionId]);

  useEffect(() => {
    if (step === "instructions" && instructionTime > 0) {
      const timer = setTimeout(() => setInstructionTime(instructionTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === "instructions" && instructionTime === 0) {
      setStep("assessment");
    }
  }, [instructionTime, step]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTest, currentQuestion]);

  // REMOVED: The reset useEffect that was clearing all state
  // The reset logic is now handled in AssessmentWrapper's loadAssessmentData
  // based on tie-breaker status from the backend API

  const resetState = useCallback(() => {
    setStep(isResume ? "assessment" : "select-assessment");
    setCurrentTest(0);
    setCurrentQuestion(0);
    setTimeLeft(tests[0]?.timePerQuestion || 60);
    setAnswers({});
    setSelectedAnswer("");
    setInstructionTime(60);
    setTimeoutNotified(false);
    setSectionTimes({ "personality-test": 0, "interest-test": 0, "aptitude-test": 0 });
    setQuestionTimes({});
  }, [isResume, tests]);

  return {
    step, setStep,
    instructionTime, setInstructionTime,
    currentTest, setCurrentTest,
    currentQuestion, setCurrentQuestion,
    timeLeft, setTimeLeft,
    answers, setAnswers,
    selectedAnswer, setSelectedAnswer,
    selectedAssessment, setSelectedAssessment,
    hasInteracted, setHasInteracted,
    showConfirmModal, setShowConfirmModal,
    timeoutNotified, setTimeoutNotified,
    isReporting, setIsReporting,
    reportDescription, setReportDescription,
    reportError, setReportError,
    isSubmittingAssessment, setIsSubmittingAssessment,
    showThankYou, setShowThankYou,
    completedTestType, setCompletedTestType,
    questionStartTime, setQuestionStartTime,
    sectionTimes, setSectionTimes,
    questionTimes, setQuestionTimes,
    resetState,
    SECTION_TIMES_KEY,
    QUESTION_TIMES_KEY,
    CURRENT_TEST_KEY
  };
};