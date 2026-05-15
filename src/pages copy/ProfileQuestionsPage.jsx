import React, { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import {
  useGetParentNormalTestQuestionsQuery,
  useSubmitNormalTestMutation,
  useGetStudentTestResponsesQuery,
  useGetNormalTestStatusQuery,
} from "../redux/services/studentApi";
import Buttons from "../components/Ui/Buttons";
import { useApiErrorHandling } from "../hooks/useApiErrorHandling";
import QuestionForm from "../components/QuestionForm";

const ProfileQuestionForm = ({ onBack, studentId }) => {
  const { data, isLoading, isError } = useGetParentNormalTestQuestionsQuery();
  const { handleError } = useApiErrorHandling();

  const questions = useMemo(
    () => (data || []).map((q) => ({ ...q, id: q.que_id })),
    [data],
  );

  const [answers, setAnswers] = useState({});
  const [otherValues, setOtherValues] = useState({});
  const [submitNormalTest, { isLoading: isSubmitting }] =
    useSubmitNormalTestMutation();

  const { data: responsesData, refetch: refetchResponses } =
    useGetStudentTestResponsesQuery(studentId, { skip: !studentId });
  const { data: testStatusData, refetch: refetchStatus } =
    useGetNormalTestStatusQuery(studentId, { skip: !studentId });

  const questionIdMapping = {
    likeId: 9,
    dislikeId: 10,
    preferId: 12,
    avoidId: 13,
  };

  const getSelectedFor = (qid) => answers[qid] || [];

  const getPickCount = (text) => {
    let match = text.match(/\(Pick\s+(\d+)\)/i);
    if (match) return parseInt(match[1], 10);
    match = text.match(/Top\s+(\d+)/i);
    if (match) return parseInt(match[1], 10);
    return null;
  };

  const handleOptionChange = useCallback(
    (questionId, option, isMultiSelect) => {
      setAnswers((prev) => {
        const current = prev[questionId] || [];
        if (isMultiSelect) {
          return {
            ...prev,
            [questionId]: current.includes(option)
              ? current.filter((opt) => opt !== option)
              : [...current, option],
          };
        } else {
          return { ...prev, [questionId]: [option] };
        }
      });
    },
    [],
  );

  const handleOtherClick = useCallback((questionId, isMultiSelect) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: isMultiSelect
        ? [...(prev[questionId] || []), "Other"]
        : ["Other"],
    }));
  }, []);

  const handleOtherInputChange = useCallback((questionId, value) => {
    setOtherValues((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const isFormValid = useMemo(() => {
    for (const q of questions) {
      const requiredCount = getPickCount(q.que_text);
      const selected = answers[q.id] || [];
      if (requiredCount) {
        if (selected.length !== requiredCount) return false;
      } else if (selected.length === 0) {
        return false;
      }
    }
    return true;
  }, [questions, answers]);

  const handleSubmit = useCallback(async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, values]) => {
          const finalValues = values.map((val) =>
            val === "Other" ? otherValues[questionId] || "Other" : val,
          );
          return {
            question_id: parseInt(questionId, 10),
            answer_value:
              finalValues.length === 1 ? finalValues[0] : finalValues,
          };
        },
      );

      const payload = { is_parent_form: true, answers: formattedAnswers };
      await submitNormalTest(payload).unwrap();
      toast.success("Parent answers submitted successfully!");
      refetchResponses();
      refetchStatus();
    } catch (error) {
      handleError(error);
    }
  }, [
    answers,
    otherValues,
    submitNormalTest,
    refetchResponses,
    refetchStatus,
    handleError,
  ]);

  useEffect(() => {
    if (responsesData) {
      const parentAnswers = {};
      const parentOtherValues = {};
      responsesData.forEach((resp) => {
        if (resp.is_parent_question) {
          let values = [];
          if (typeof resp.answer_value === "string")
            values = resp.answer_value.split(",").map((v) => v.trim());
          else if (Array.isArray(resp.answer_value)) values = resp.answer_value;
          parentAnswers[resp.question_id] = values;
          if (values.includes("Other"))
            parentOtherValues[resp.question_id] = "";
        }
      });
      setAnswers(parentAnswers);
      setOtherValues(parentOtherValues);
    }
  }, [responsesData]);

  const getSubmittedAnswer = (questionId, isParent) => {
    if (!responsesData) return null;
    const resp = responsesData.find(
      (r) =>
        r.question_id === questionId && r.is_parent_question === !!isParent,
    );
    return resp ? resp.answer_value : null;
  };

  const getStudentAnswerOptions = (questionId) => {
    if (!responsesData) return [];
    const resp = responsesData.find(
      (r) => r.question_id === questionId && r.is_parent_question === false,
    );
    if (!resp || !resp.answer_value) return [];
    return resp.answer_value.split(",").map((v) => v.trim());
  };

  if (isLoading)
    return (
      <p className="text-center py-4 text-sm" style={{ color: "#64748B" }}>
        Loading questions...
      </p>
    );
  if (isError)
    return (
      <p className="text-center py-4 text-sm" style={{ color: "#DC2626" }}>
        Failed to load parent questions.
      </p>
    );

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <div
      className="bg-white rounded-xl p-6 max-w-5xl mx-auto"
      style={cardStyle}
    >
      <div className="flex items-center justify-between mb-5 gap-2">
        <Buttons
          onClick={onBack}
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

        <h1
          className="flex-1 text-center font-semibold text-base md:text-lg"
          style={{ color: "#0F172A" }}
        >
          Parent Profile Questions
        </h1>

        <div className="w-12 sm:w-20" />
      </div>

      <QuestionForm
        questions={questions}
        answers={answers}
        otherValues={otherValues}
        onOptionChange={handleOptionChange}
        onOtherClick={handleOtherClick}
        onOtherInputChange={handleOtherInputChange}
        getPickCount={getPickCount}
        getSelectedFor={getSelectedFor}
        getSubmittedAnswer={getSubmittedAnswer}
        getStudentAnswerOptions={getStudentAnswerOptions}
        questionIdMapping={questionIdMapping}
      />

      <div className="mt-6 flex justify-center">
        <Buttons
          onClick={handleSubmit}
          disabled={
            !isFormValid ||
            isSubmitting ||
            testStatusData?.parent_form?.is_complete === true
          }
          className="rounded-lg font-semibold px-6 py-2 text-sm text-white transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background:
              isFormValid &&
              !(testStatusData?.parent_form?.is_complete === true)
                ? "#2563EB"
                : "#CBD5E1",
            border: "none",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Buttons>
      </div>
    </div>
  );
};

export default ProfileQuestionForm;
