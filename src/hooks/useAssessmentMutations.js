import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useSubmitCTestAnswerMutation,
  useSubmitITestAnswerMutation,
  useSubmitATestAnswerMutation,
  useReportAssessmentIssueMutation,
  useSubmitAssessmentMutation,
} from "../redux/services/assessmentApi";
import { useSubmitAssessmentTimesMutation } from "../redux/services/testApi";
import { useApiErrorHandling } from "./useApiErrorHandling";

export const useAssessmentMutations = (
  sessionId,
  sectionTimes
) => {
  const navigate = useNavigate();
  const { handleError } = useApiErrorHandling();

  const [reportAssessmentIssue] = useReportAssessmentIssueMutation();
  const [submitCTestAnswer] = useSubmitCTestAnswerMutation();
  const [submitITestAnswer] = useSubmitITestAnswerMutation();
  const [submitATestAnswer] = useSubmitATestAnswerMutation();
  const [submitAssessment] = useSubmitAssessmentMutation();
  const [submitAssessmentTimes] = useSubmitAssessmentTimesMutation();

  // Report assessment issue
  const handleReportIssue = async (description, questionId, onSuccess) => {
    if (!description) {
      toast.error("Please describe the issue.");
      return false;
    }
    try {
      await reportAssessmentIssue({
        session_id: sessionId,
        issue_type: "question",
        description,
        question_id: questionId,
      }).unwrap();
      toast.success("Issue reported successfully.");
      if (onSuccess) onSuccess();
      return true;
    } catch (err) {
      handleError(err);
      return false;
    }
  };

  // Submit full assessment (after all sections)
  const handleAssessmentSubmit = async () => {
    try {
      const timetaken = [
        { section_name: "personality-test", time_taken_seconds: sectionTimes["personality-test"] },
        { section_name: "interest-test", time_taken_seconds: sectionTimes["interest-test"] },
        { section_name: "aptitude-test", time_taken_seconds: sectionTimes["aptitude-test"] },
      ];

      if (sessionId) {
        await submitAssessment({ session_id: sessionId }).unwrap();
      }

      toast.success("Assessment submitted successfully.");
      navigate(`/student/strengths?session_id=${sessionId}`);
      return true;
    } catch (err) {
      handleError(err);
      return false;
    }
  };

  const submitAnswer = async (
    testType,
    questionObj,
    selectedAnswer,
    isLastQuestion,
    forceIncomplete = false,
    sectionTime
  ) => {
    if (!sessionId || !questionObj || selectedAnswer === undefined || selectedAnswer === null) {
      return false;
    }

    try {
      let payload;
      let mutation;

      // ---  C-TEST ---
      if (testType === "personality-test") {
        const validOptions = [questionObj.options?.[0], questionObj.options?.[1]].filter(Boolean);
        let answerValue = selectedAnswer;
        const indexMap = { 0: "A", 1: "B" };
        const idx = validOptions.findIndex((opt) => opt === selectedAnswer);
        if (idx !== -1) answerValue = indexMap[idx];
        if (selectedAnswer === "A" || selectedAnswer === "B") answerValue = selectedAnswer;

        // --- Fix: If this is a tie-breaker question, never mark as final ---
        const isTieBreaker = questionObj.isTieBreaker === true;
        payload = {
          session_id: sessionId,
          question_id: questionObj.question_id,
          answer_value: answerValue,
          is_final_answer_for_section: isTieBreaker ? false : (forceIncomplete ? false : isLastQuestion),
        };
        mutation = submitCTestAnswer;
      }

      // --- I-TEST ---
      else if (testType === "interest-test") {
        const validOptions = ["Strongly Like", "Like", "Unsure", "Dislike", "Strongly Dislike"];
        const answerValue = validOptions.includes(selectedAnswer)
          ? selectedAnswer
          : "Unsure";

        payload = {
          session_id: sessionId,
          question_id: questionObj.question_id,
          answer_value: answerValue,
          is_final_answer_for_section: isLastQuestion,
        };
        mutation = submitITestAnswer;
      }

      // --- A-TEST ---
      else if (testType === "aptitude-test") {
        const validOptions = [
          questionObj.options?.[0],
          questionObj.options?.[1],
          questionObj.options?.[2],
          questionObj.options?.[3],
        ].filter(Boolean);
        let answerValue = selectedAnswer;
        const letterMap = ["A", "B", "C", "D"];
        const idx = validOptions.findIndex((opt) => opt === selectedAnswer);
        if (idx !== -1) answerValue = letterMap[idx];

        payload = {
          session_id: sessionId,
          question_id: questionObj.question_id,
          answer_value: answerValue,
          is_final_answer_for_section: isLastQuestion,
        };
        mutation = submitATestAnswer;
      }

      // --- Perform mutation ---
      if (mutation) {
        await mutation(payload).unwrap();

        //  Submit section time if this is the last question of the section
        if (isLastQuestion && !forceIncomplete) {
          let sectionName = null;
          if (testType === "personality-test") sectionName = "personality-test";
          else if (testType === "interest-test") sectionName = "interest-test";
          else if (testType === "aptitude-test") sectionName = "aptitude-test";

          if (sectionName && sectionTime !== undefined) {
            await submitAssessmentTimes({
              session_id: sessionId,
              timetaken: [
                {
                  section_name: sectionName,
                  time_taken_seconds: sectionTime,
                },
              ],
            }).unwrap();
          }
        }

        toast.success("Your answer has been successfully recorded!");
        return true;
      }

      return false;
    } catch (err) {
      handleError(err);
      return false;
    }
  };

  // Return hook API
  return {
    handleReportIssue,
    handleAssessmentSubmit,
    submitAnswer,
  };
};
