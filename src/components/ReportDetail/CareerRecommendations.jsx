import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  useGetCareerRecommendationsQuery,
  useSubmitCareerFeedbackMutation,
} from "../../redux/services/assessmentApi";
import Buttons from "../Ui/Buttons";
import { useApiErrorHandling } from "../../hooks/useApiErrorHandling";

const CareerRecommendations = ({ sessionId, onSelect }) => {
  const [feedback, setFeedback] = useState({});
  const [submitCareerFeedback] = useSubmitCareerFeedbackMutation();
  const { handleError } = useApiErrorHandling();

  const parsedSessionId = sessionId ? parseInt(sessionId, 10) : undefined;
  const isValidSessionId =
    Number.isInteger(parsedSessionId) && !isNaN(parsedSessionId);

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  if (!isValidSessionId) {
    return (
      <div className="bg-white rounded-2xl p-6 mb-8" style={cardStyle}>
        <p className="text-center text-sm" style={{ color: "#DC2626" }}>
          Invalid or missing session ID for career recommendations.
        </p>
      </div>
    );
  }

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetCareerRecommendationsQuery(parsedSessionId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 mb-8" style={cardStyle}>
        <p className="text-center text-sm" style={{ color: "#64748B" }}>
          Loading career recommendations...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl p-6 mb-8" style={cardStyle}>
        <p className="text-center text-sm" style={{ color: "#DC2626" }}>
          Failed to load career recommendations.
        </p>
      </div>
    );
  }

  const careers = Array.isArray(apiData)
    ? apiData.map((item) => ({
        id: item.career_profile.career_profile_id,
        title: item.career_profile.career_name,
        description: item.career_profile.career_description,
        match: Math.round(item.match_scores.ci_match_score),
        stream: item.career_profile.stream,
        sub_categories: item.career_profile.sub_categories,
        example_careers: item.career_profile.example_careers,
        new_age_careers: item.career_profile.new_age_careers,
        key_skills: item.career_profile.key_skills,
        subjects_12th: item.career_profile.subjects_12th,
        entrance_exams: item.career_profile.entrance_exams,
        feedback: item.match_scores.feedback,
      }))
    : [];

  const handleFeedback = async (e, careerId, type) => {
    e.stopPropagation();
    const feedbackType = type === "like" ? "liked" : "disliked";
    setFeedback((prev) => ({
      ...prev,
      [careerId]: prev[careerId] === type ? null : type,
    }));
    try {
      await submitCareerFeedback({
        session_id: parsedSessionId,
        career_id: careerId,
        feedback: feedbackType,
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 mb-8" style={cardStyle}>
      <h2
        className="text-base md:text-lg font-semibold mb-4 text-center sm:text-left"
        style={{ color: "#0F172A" }}
      >
        Career Recommendations
      </h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {careers.map((career) => {
          const localFeedback = feedback[career.id];
          const apiFeedback = career.feedback;
          const effectiveFeedback =
            localFeedback !== undefined
              ? localFeedback
              : apiFeedback === "liked"
                ? "like"
                : apiFeedback === "disliked"
                  ? "dislike"
                  : null;

          return (
            <div
              key={career.id}
              onClick={() => onSelect(career)}
              className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: "0.5px solid #E2E8F0", background: "white" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#DBEAFE";
                e.currentTarget.style.background = "#EFF6FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E2E8F0";
                e.currentTarget.style.background = "white";
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className="text-sm md:text-base font-semibold"
                  style={{ color: "#0F172A" }}
                >
                  {career.title}
                </h3>
                <div className="flex items-center gap-1">
                  <Star
                    className="h-4 w-4"
                    style={{ color: "#FBBF24", fill: "#FBBF24" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#475569" }}
                  >
                    {career.match}%
                  </span>
                </div>
              </div>
              <p className="text-sm mb-3" style={{ color: "#64748B" }}>
                {career.description}
              </p>
              <div className="flex flex-wrap justify-between items-center">
                <span
                  className="text-sm font-semibold cursor-pointer hover:underline"
                  style={{ color: "#2563EB" }}
                >
                  Read more
                </span>
                <div className="flex items-center gap-3">
                  <Buttons
                    onClick={(e) => handleFeedback(e, career.id, "like")}
                    className="flex items-center text-sm gap-1 transition-colors"
                    style={{
                      color:
                        effectiveFeedback === "like" ? "#15803D" : "#94A3B8",
                      fontWeight: effectiveFeedback === "like" ? 600 : 400,
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <ThumbsUp
                      className="h-4 w-4"
                      fill={
                        effectiveFeedback === "like" ? "currentColor" : "none"
                      }
                    />
                    Like
                  </Buttons>
                  <Buttons
                    onClick={(e) => handleFeedback(e, career.id, "dislike")}
                    className="flex items-center text-sm gap-1 transition-colors"
                    style={{
                      color:
                        effectiveFeedback === "dislike" ? "#DC2626" : "#94A3B8",
                      fontWeight: effectiveFeedback === "dislike" ? 600 : 400,
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <ThumbsDown
                      className="h-4 w-4"
                      fill={
                        effectiveFeedback === "dislike"
                          ? "currentColor"
                          : "none"
                      }
                    />
                    Dislike
                  </Buttons>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareerRecommendations;
