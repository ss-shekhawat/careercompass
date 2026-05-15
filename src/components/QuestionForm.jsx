import React from "react";
import Buttons from "./Ui/Buttons";

const QuestionForm = ({
  questions,
  answers,
  otherValues,
  onOptionChange,
  onOtherClick,
  onOtherInputChange,
  getPickCount,
  getSelectedFor,
  getSubmittedAnswer,
  getStudentAnswerOptions,
  questionIdMapping,
  displayMode = 'chips', // 'chips' or 'radio'
  onStateChange,
  formData,
}) => {
  const renderOptions = (question) => {
    const pickCount = getPickCount(question.que_text);
    const isMultiSelect = pickCount && pickCount > 1;

    const enjoySelected = getSelectedFor(questionIdMapping.likeId);
    const dislikeSelected = getSelectedFor(questionIdMapping.dislikeId);
    const bestCareerSelected = getSelectedFor(questionIdMapping.preferId);
    const avoidCareerSelected = getSelectedFor(questionIdMapping.avoidId);

    const submittedAnswer = getSubmittedAnswer
      ? getSubmittedAnswer(question.id, question.is_parent_question)
      : null;

    const studentAnswerOptions = getStudentAnswerOptions
      ? question.is_parent_question
        ? getStudentAnswerOptions(question.id)
        : []
      : [];

    let disabledOptions = [];
  
    switch (question.id) {
      case questionIdMapping.dislikeId:
        disabledOptions = enjoySelected.filter((opt) => opt !== "Other");
        break;
      case questionIdMapping.likeId:
        disabledOptions = dislikeSelected.filter((opt) => opt !== "Other");
        break;
      case questionIdMapping.avoidId:
        disabledOptions = bestCareerSelected;
        break;
      case questionIdMapping.preferId:
        disabledOptions = avoidCareerSelected;
        break;
      default:
        break;
    }

    if (displayMode === 'radio') {
      const value = formData[question.id] || (isMultiSelect ? [] : "");
      return (
        <div className="flex flex-wrap gap-2">
          {question.answer_options.map((opt) => {
            const isDisabled = disabledOptions.includes(opt);
            const isSelected = isMultiSelect ? value.includes(opt) : value === opt;
            
            //  Add orange color logic for dislike/avoid questions
            let selectedColor = 'bg-teal-500 white-text';
            if (isSelected && (
              question.id === questionIdMapping.dislikeId ||
              question.id === questionIdMapping.avoidId
            )) {
              selectedColor = 'bg-orange-500 white-text border-orange-600';
            }
            
            let renderOption;
            switch (isMultiSelect) {
              case true:
                renderOption = (
                  <Buttons
                    key={opt}
                    type="button"
                    onClick={() => !isDisabled && onStateChange(question.id, opt, pickCount)}
                    className={`px-3 py-1 rounded-full border transition transform hover:scale-105 ${
                      isSelected 
                        ? selectedColor  
                        : 'bg-teal-50 text-teal-800'
                    } ${isDisabled ? " opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isDisabled}
                  >
                    {opt}
                  </Buttons>
                );
                break;
              case false:
              default:
                renderOption = (
                  <label key={opt} className="mr-4">
                    <input
                      type="radio"
                      name={`q_${question.id}`}
                      value={opt}
                      checked={value === opt}
                      onChange={() => !isDisabled && onStateChange(question.id, opt)}
                      className="mr-1"
                      disabled={isDisabled}
                    />
                    {opt}
                  </label>
                );
                break;
            }
            return renderOption;
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {question.answer_options.map((option, optIndex) => {
          const isOther = option.startsWith("Other");
          const selected = answers[question.id]?.includes(option);
          const isStudentSelected =
            question.is_parent_question &&
            studentAnswerOptions.includes(option);
          const isDisabled = disabledOptions.includes(option);

          let chipColor = "";
          if (selected) {
            if (
              question.id === questionIdMapping.dislikeId ||
              question.id === questionIdMapping.avoidId
            ) {
              chipColor = "bg-orange-500 border-orange-600 white-text";
            } else {
              chipColor = "primary-background border-teal-700 white-text";
            }
          } else if (isStudentSelected) {
            chipColor =
              "border-2 border-blue-500 bg-blue-50 text-blue-700";
          } else {
            chipColor =
              "bg-teal-50 border-gray-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800";
          }

          if (isOther) {
            return (
              <div
                key={optIndex}
                className={`flex items-center px-4 py-1 rounded-full border transition cursor-pointer ${chipColor}`}
                onClick={() =>
                  !isDisabled &&
                  onOtherClick(question.id, isMultiSelect)
                }
                style={{
                  opacity: isDisabled ? 0.5 : 1,
                  pointerEvents: isDisabled ? "none" : "auto",
                }}
                title={isStudentSelected ? "Student selected" : ""}
              >
                <span>Other</span>
                {selected && (
                  <input
                    type="text"
                    value={otherValues[question.id] || ""}
                    onChange={(e) =>
                      onOtherInputChange(
                        question.id,
                        e.target.value
                      )
                    }
                    placeholder="Please specify"
                    className="ml-2 px-2 py-1 border rounded white-background text-gray-700"
                    style={{ minWidth: 100 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {isStudentSelected && (
                  <span className="ml-2 text-xs text-blue-600 font-semibold">
                    Student selected
                  </span>
                )}
              </div>
            );
          }

          return (
            <Buttons
              key={optIndex}
              type="button"
              className={`px-3 py-0.5 rounded-full border transition transform hover:scale-105 ${chipColor}`}
              onClick={() =>
                !isDisabled &&
                onOptionChange(question.id, option, isMultiSelect)
              }
              disabled={
                isDisabled ||
                (isMultiSelect &&
                  !selected &&
                  answers[question.id]?.length >= pickCount)
              }
              style={{
                opacity: isDisabled ? 0.5 : 1,
                pointerEvents: isDisabled ? "none" : "auto",
              }}
              title={isStudentSelected ? "Student selected" : ""}
            >
              {option}
              {isStudentSelected && (
                <span className="ml-2 text-xs text-blue-600 font-semibold">
                  Student selected
                </span>
              )}
            </Buttons>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id}>
          <div className="no-copy">
            <p className="font-semibold text-gray-700 mb-2 block">
              {index + 1}. {question.que_text}
            </p>
          </div>
          {getSubmittedAnswer && getSubmittedAnswer(question.id, question.is_parent_question) && (
            <div className="mb-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded text-teal-800 text-sm">
              <span className="font-semibold">Submitted Answer:</span>{" "}
              {getSubmittedAnswer(question.id, question.is_parent_question)}
            </div>
          )}
          {renderOptions(question)}
        </div>
      ))}
    </div>
  );
};

export default QuestionForm;