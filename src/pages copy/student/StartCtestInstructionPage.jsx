import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { dimensions, introSentences } from "../../../data/content";
import Buttons from "../../../components/Ui/Buttons";
import { useStartAssessmentMutation } from "../../../redux/services/assessmentApi";
import { useApiErrorHandling } from "../../../hooks/useApiErrorHandling";

const StartCtestInstructionPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [startAssessment] = useStartAssessmentMutation();
  const { handleError } = useApiErrorHandling();

  useEffect(() => {
    if (currentStep < introSentences.length + 1) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleProceed = async () => {
    setIsLoading(true);
    try {
      const response = await startAssessment().unwrap();
      setIsLoading(false);
      navigate("/student/assessment-instruction", {
        state: { testType: "personality-test", sessionId: response.session_id },
      });
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-6"
      style={{
        background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)",
      }}
    >
      <div className="max-w-3xl w-full space-y-6 text-center">
        {introSentences.map((sentence, index) => {
          if (currentStep === index) {
            return (
              <p
                key={index}
                className="text-base md:text-lg animate-fade-in transition-all duration-700"
                style={{ color: "#475569" }}
              >
                {sentence}
              </p>
            );
          } else if (currentStep > index) {
            return (
              <p
                key={index}
                className="text-base md:text-lg"
                style={{ color: "#475569" }}
              >
                {sentence}
              </p>
            );
          } else {
            return null;
          }
        })}

        {currentStep > introSentences.length && (
          <div className="space-y-5 animate-slide-up transition-all duration-700">
            {dimensions.map((dim, idx) => (
              <div
                key={idx}
                className="text-left rounded-xl p-5"
                style={{
                  background: "white",
                  border: "0.5px solid #DBEAFE",
                  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "#2563EB" }}
                >
                  Dimension: {dim.title}
                </h3>
                <ul className="space-y-2">
                  {dim.description.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start"
                      style={{ color: "#475569" }}
                    >
                      <TiTick
                        className="mt-1 mr-2 text-lg flex-shrink-0"
                        style={{ color: "#2563EB" }}
                      />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Buttons
              onClick={handleProceed}
              disabled={isLoading}
              className="mt-6 rounded-lg font-semibold px-6 py-2.5 text-sm text-white inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: isLoading ? "#93C5FD" : "#2563EB",
                border: "none",
              }}
            >
              {isLoading ? (
                <>
                  <div
                    className="w-3 h-3 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                    }}
                  ></div>
                  Loading...
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Buttons>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartCtestInstructionPage;
