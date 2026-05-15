import { X } from "lucide-react";
import { useGetStudentStrengthsWeaknessesQuery } from "../../redux/services/assessmentApi";
import Buttons from "../Ui/Buttons";

const TraitSelectionModal = ({
  isOpen,
  onClose,
  traitKey,
  traitInfoMap,
  sessionId,
}) => {
  if (!isOpen || !traitKey) return null;

  const parsedSessionId = sessionId ? parseInt(sessionId, 10) : undefined;
  const isValidSessionId =
    Number.isInteger(parsedSessionId) && !isNaN(parsedSessionId);

  const { data, isLoading, isError } = useGetStudentStrengthsWeaknessesQuery(
    parsedSessionId,
    {
      skip: !isValidSessionId,
    },
  );

  const trait = traitInfoMap[traitKey];

  const uniqueStrengths = Array.isArray(data?.strengths)
    ? Array.from(new Set(data.strengths))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
      style={{ background: "rgba(15, 23, 42, 0.6)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#2563EB" }}>
            {trait?.title || "Strengths & Weaknesses"}
          </h2>
          <Buttons
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#F1F5F9", color: "#475569", border: "none" }}
          >
            <X className="w-4 h-4" />
          </Buttons>
        </div>

        {isLoading && (
          <p className="text-sm" style={{ color: "#64748B" }}>
            Loading...
          </p>
        )}
        {isError && (
          <p className="text-sm" style={{ color: "#DC2626" }}>
            Failed to load data.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="overflow-y-auto mb-2 max-h-96">
            {uniqueStrengths.map((strength, idx) => (
              <div
                key={`${strength}-${idx}`}
                className="rounded-lg p-3 mb-3 text-sm"
                style={{
                  background: "#F8FAFC",
                  border: "0.5px solid #E2E8F0",
                  color: "#475569",
                }}
              >
                {strength}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TraitSelectionModal;
