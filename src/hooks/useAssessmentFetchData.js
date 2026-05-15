import {
  useFetchCTestQuestionsQuery,
  useFetchITestQuestionsQuery,
  useFetchATestQuestionsQuery,
  useFetchCTieBreakerQuestionsMutation,
} from "../redux/services/testApi";
import { useFetchAssessmentStatusQuery } from "../redux/services/assessmentApi";
import { skipToken } from "@reduxjs/toolkit/query";

export const useAssessmentFetchData = (
  sessionId,
  isResume,
  tieBreakerActive,
  tieBreakerQuestions,
  tieBreakerPayload 
) => {
  const { data: assessmentStatus, isLoading: statusLoading } = useFetchAssessmentStatusQuery();

  const { data: cTestData, error: cTestError } = useFetchCTestQuestionsQuery(
    sessionId ? { sessionId } : skipToken
  );
  const { data: iTestData, error: iTestError } = useFetchITestQuestionsQuery(
    sessionId ? { sessionId } : skipToken
  );
  const { data: aTestData, error: aTestError } = useFetchATestQuestionsQuery(
    sessionId ? { sessionId } : skipToken
  );
  const [
    fetchCTieBreakerQuestions,
    { data: tieBreakerApiData, isLoading: tieBreakerLoading, error: tieBreakerError }
  ] = useFetchCTieBreakerQuestionsMutation();

  const cTestCompleted = assessmentStatus?.sections?.find(
    (s) => s.section_name === "personality-test"
  )?.is_completed || false;
  
  const iTestCompleted = assessmentStatus?.sections?.find(
    (s) => s.section_name === "interest-test"
  )?.is_completed || false;
  
  const aTestCompleted = assessmentStatus?.sections?.find(
    (s) => s.section_name === "aptitude-test"
  )?.is_completed || false;

  // Tie breaker logic
  let tieBreakerFetchedQuestions = [];
  const shouldFetchTieBreaker = tieBreakerActive && Array.isArray(tieBreakerPayload) && tieBreakerPayload.length > 0 && sessionId;

  // Fetch tie breaker questions if needed
  if (shouldFetchTieBreaker && !tieBreakerApiData && !tieBreakerLoading) {
    fetchCTieBreakerQuestions({ sessionId, payload: tieBreakerPayload });
  }

  if (Array.isArray(tieBreakerApiData) && tieBreakerApiData.length > 0) {
    tieBreakerFetchedQuestions = tieBreakerApiData.map((q) => ({
      question: q.question_text,
      options: [q.option_a, q.option_b].filter(Boolean),
      question_id: q.question_id,
      isTieBreaker: true,
    }));
  }

  const createNormalizedTests = () => {
    const tests = [];

    if (!cTestCompleted && cTestData && cTestData.length > 0) {
      let cQuestions = cTestData.map((q) => ({
        question: q.question_text,
        options: [q.option_a, q.option_b].filter(Boolean),
        question_id: q.question_id,
      }));

      // Add tie breaker questions if fetched and available
      if (tieBreakerFetchedQuestions.length > 0) {
        cQuestions = [...cQuestions, ...tieBreakerFetchedQuestions];
      } else if (tieBreakerActive) {
        // fallback to passed tieBreakerQuestions if no fetched questions
        cQuestions = [
          ...cQuestions,
          ...(tieBreakerQuestions || []).map((q) => ({
            question: q.question_text,
            options: [q.option_a, q.option_b].filter(Boolean),
            question_id: q.question_id,
            isTieBreaker: true,
          })),
        ];
      }

      tests.push({
        name: "Personality Test",
        description: "Answer the following personality questions.",
        timePerQuestion: 30,
        questions: cQuestions,
      });
    }

    if (!iTestCompleted && iTestData && iTestData.length > 0) {
      tests.push({
        name: "Interest Test",
        description: "Answer the following interest questions.",
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

    if (!aTestCompleted && aTestData && aTestData.length > 0) {
      tests.push({
        name: "Aptitude Test",
        timePerQuestion: 60,
        questions: aTestData.map((q, idx) => ({
          question: q.question_text,
          options: [
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
          ].filter(Boolean),
          question_id: q.question_id,
          resource_url: q.resource_url || "",
          que_title: q.que_title || "",
          que_para: q.que_para || "",
          que_bullet: q.que_bullet || [],
        })),
      });
    }

    return tests.length > 0 ? tests : [];
  };

  const allSectionsCompleted = cTestCompleted && iTestCompleted && aTestCompleted;

  return {
    assessmentStatus,
    statusLoading,
    cTestError,
    iTestError,
    aTestError,
    tieBreakerApiData,
    fetchCTieBreakerQuestions,
    allSectionsCompleted,
    tieBreakerLoading,
    tieBreakerError,
  };
};
