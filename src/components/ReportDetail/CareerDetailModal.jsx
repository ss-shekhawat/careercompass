import React from "react";
import { Award, X } from "lucide-react";
import Buttons from "../Ui/Buttons";

const CareerDetailModal = ({ career, onClose }) => {
  if (!career) return null;
  const careerData = career.career_profile || career;
  const matchScores = career.match_scores || {};

  const Tag = ({ children, bg, color }) => (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: bg, color: color }}
    >
      {children}
    </span>
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(15, 23, 42, 0.6)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-lg md:text-xl font-bold"
              style={{ color: "#0F172A" }}
            >
              {careerData.name || careerData.title}
            </h2>
            <Buttons
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "#F1F5F9",
                color: "#475569",
                border: "none",
              }}
            >
              <X className="w-4 h-4" />
            </Buttons>
          </div>

          {(careerData.sub_categories || []).length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {careerData.sub_categories.map((sub) => (
                <Tag key={sub} bg="#DBEAFE" color="#1E40AF">
                  {sub}
                </Tag>
              ))}
            </div>
          )}

          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" style={{ color: "#FBBF24" }} />
              <span
                className="font-medium text-sm"
                style={{ color: "#0F172A" }}
              >
                Match Score: {matchScores.cia_match_score || career.match}%
              </span>
            </div>

            <div>
              <h3
                className="font-semibold mb-1.5 text-sm"
                style={{ color: "#0F172A" }}
              >
                Description
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#475569" }}
              >
                {careerData.description}
              </p>
            </div>

            {(careerData.example_careers || []).length > 0 && (
              <div>
                <h3
                  className="font-semibold mb-2 text-sm"
                  style={{ color: "#0F172A" }}
                >
                  Example Careers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerData.example_careers.map((c) => (
                    <Tag key={c} bg="#DCFCE7" color="#15803D">
                      {c}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {(careerData.new_age_careers || []).length > 0 && (
              <div>
                <h3
                  className="font-semibold mb-2 text-sm"
                  style={{ color: "#0F172A" }}
                >
                  New Age Careers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerData.new_age_careers.map((c) => (
                    <Tag key={c} bg="#FEF3C7" color="#B45309">
                      {c}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {(careerData.key_skills || []).length > 0 && (
              <div>
                <h3
                  className="font-semibold mb-2 text-sm"
                  style={{ color: "#0F172A" }}
                >
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerData.key_skills.map((skill) => (
                    <Tag key={skill} bg="#E0E7FF" color="#3730A3">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {(careerData.subjects_12th || []).length > 0 && (
              <div>
                <h3
                  className="font-semibold mb-2 text-sm"
                  style={{ color: "#0F172A" }}
                >
                  12th Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerData.subjects_12th.map((s) => (
                    <Tag key={s} bg="#FCE7F3" color="#BE185D">
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {(careerData.entrance_exams || []).length > 0 && (
              <div>
                <h3
                  className="font-semibold mb-2 text-sm"
                  style={{ color: "#0F172A" }}
                >
                  Entrance Exams
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerData.entrance_exams.map((e) => (
                    <Tag key={e} bg="#FFE4E6" color="#9F1239">
                      {e}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetailModal;
