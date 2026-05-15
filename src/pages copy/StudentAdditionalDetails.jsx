import { useNavigate } from "react-router-dom";
import { INDIA_STATES, CITY_BY_STATE } from "../data/locations";
import { useState, useRef } from "react";
import Buttons from "../components/Ui/Buttons";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/services/studentApi";
import Dropdown from "../components/Ui/Dropdown";

export default function StudentAdditionalDetails({
  onSubmit,
  initialData = {},
}) {
  const [formData, setFormData] = useState({
    class: initialData.class_grade || "",
    classStatus: initialData.classStatus || "ongoing",
    dob: initialData.dob || "",
    board: initialData.board || "",
    state: initialData.state || "",
    city: initialData.city || "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [classOpen, setClassOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [classStyle, setClassStyle] = useState({});
  const [boardStyle, setBoardStyle] = useState({});
  const [stateStyle, setStateStyle] = useState({});
  const [cityStyle, setCityStyle] = useState({});

  const classRef = useRef(null);
  const boardRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  const calculatePosition = (element) => {
    if (!element) return {};
    const rect = element.getBoundingClientRect();
    return {
      position: "fixed",
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      transform: "none",
      marginTop: 0,
    };
  };

  const toggleClass = () => {
    if (!classOpen) setClassStyle(calculatePosition(classRef.current));
    setClassOpen(!classOpen);
  };

  const toggleBoard = () => {
    if (!boardOpen) setBoardStyle(calculatePosition(boardRef.current));
    setBoardOpen(!boardOpen);
  };

  const toggleState = () => {
    if (!stateOpen) setStateStyle(calculatePosition(stateRef.current));
    setStateOpen(!stateOpen);
  };

  const toggleCity = () => {
    if (!cityOpen) setCityStyle(calculatePosition(cityRef.current));
    setCityOpen(!cityOpen);
  };

  // Returns the minimum age for a given grade using Math.max(gradeNum + 3, 12)
  // (baseline reference: 12 years). Older children are allowed.
  const getMinAgeForGrade = () => {
    const gradeNum = parseInt(formData.class, 10) || 0;
    return Math.max(gradeNum + 3, 12);
  };

  // max date for DOB input — student must be at least `minAge` years old
  // (we do not enforce an upper age limit here; older students are allowed)
  const getMaxDOB = () => {
    const minAge = getMinAgeForGrade();
    const today = new Date();
    today.setFullYear(today.getFullYear() - minAge);
    return today.toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.class) {
      newErrors.class = "Please select your class";
    }

    if (!formData.dob) {
      newErrors.dob = "Please enter your Date of Birth";
    } else {
      const today = new Date();
      const dob = new Date(formData.dob);

      // Calculate exact age in years
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      const gradeNum = parseInt(formData.class, 10) || 0;
      const minAge = getMinAgeForGrade();

      if (age < minAge) {
        newErrors.dob = `Student must be at least ${minAge} years old for grade ${gradeNum}.`;
      }
    }

    if (!formData.board) {
      newErrors.board = "Please select your education board";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const profileFirstName =
      profile?.first_name || initialData.first_name || "";

    if (!profileFirstName || profileFirstName.trim().length === 0) {
      toast.error("First name is required to update profile.");
      return;
    }

    const payload = {
      first_name: profileFirstName,
      class_grade: formData.class || initialData.class_grade || undefined,
      role: "student",
      date_of_birth: formData.dob || initialData.date_of_birth || undefined,
      is_report_locked: initialData.is_report_locked ?? false,
      city: formData.city || initialData.city || undefined,
      state: formData.state || initialData.state || undefined,
    };
    if (!profileFirstName || profileFirstName.trim().length === 0) {
      toast.error("First name is required to update profile.");
      return;
    }
    // Ensure non-empty first_name
    if (!profileFirstName || profileFirstName.trim().length === 0) {
      toast.error("First name is required to update profile.");
      return;
    }

    // Ensure class_grade is a string (server expects string)
    if (payload.class_grade !== undefined) {
      payload.class_grade = String(payload.class_grade);
    }

    // Remove empty-string/null/undefined fields to avoid server validation errors
    Object.keys(payload).forEach((k) => {
      if (
        payload[k] === "" ||
        payload[k] === null ||
        payload[k] === undefined
      ) {
        delete payload[k];
      }
    });

    updateProfile(payload)
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully.");
        onSubmit && onSubmit(formData);
        navigate("/student/dashboard");
      })
      .catch((err) => {
        toast.error("Failed to update profile.");
        navigate("/student/dashboard");
      });
  };

  const [updateProfile] = useUpdateProfileMutation();
  const { data: profile } = useGetProfileQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="white-background rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Class */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <div className="relative">
                <Buttons
                  type="button"
                  ref={classRef}
                  onClick={toggleClass}
                  className="w-full border rounded-lg px-3 py-2 flex items-center justify-between text-left h-10 bg-white"
                >
                  <span className="text-gray-700">
                    {formData.class || "Select Class"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${classOpen ? "rotate-180" : ""}`}
                  />
                </Buttons>

                <Dropdown
                  isOpen={classOpen}
                  onClose={() => setClassOpen(false)}
                  style={classStyle}
                  className="max-h-60 overflow-y-auto"
                >
                  <div className="py-1">
                    {[8, 9, 10, 11, 12].map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, class: cls, dob: "" });
                          setErrors({ ...errors, class: "", dob: "" });
                          setClassOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${Number(formData.class) === Number(cls) ? "primary-background text-white font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </Dropdown>
              </div>
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">{errors.class}</p>
              )}
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-1 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="classStatus"
                    value="ongoing"
                    checked={formData.classStatus === "ongoing"}
                    onChange={handleInputChange}
                    className="accent-teal-500"
                  />
                  <span>Ongoing</span>
                </label>
                <label className="flex items-center space-x-1 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="classStatus"
                    value="completed"
                    checked={formData.classStatus === "completed"}
                    onChange={handleInputChange}
                    className="accent-teal-500"
                  />
                  <span>Completed</span>
                </label>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                min={null}
                max={getMaxDOB()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Education Board */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Board
              </label>
              <div className="relative">
                <Buttons
                  type="button"
                  ref={boardRef}
                  onClick={toggleBoard}
                  className="w-full border rounded-lg px-3 py-2 flex items-center justify-between text-left h-10 bg-white"
                >
                  <span className="text-gray-700">
                    {formData.board || "Select Board"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${boardOpen ? "rotate-180" : ""}`}
                  />
                </Buttons>

                <Dropdown
                  isOpen={boardOpen}
                  onClose={() => setBoardOpen(false)}
                  style={boardStyle}
                  className="max-h-60 overflow-y-auto"
                >
                  <div className="py-1">
                    {["CBSE", "ICSE", "IGCSE", "NIOS", "IB", "State Board"].map(
                      (board) => (
                        <button
                          key={board}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, board });
                            setErrors({ ...errors, board: "" });
                            setBoardOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${formData.board === board ? "primary-background text-white font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                        >
                          {board}
                        </button>
                      ),
                    )}
                  </div>
                </Dropdown>
              </div>
              {errors.board && (
                <p className="text-red-500 text-sm mt-1">{errors.board}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select State
              </label>
              <div className="relative">
                <Buttons
                  type="button"
                  ref={stateRef}
                  onClick={toggleState}
                  className="w-full border rounded-lg px-3 py-2 flex items-center justify-between text-left h-10 bg-white"
                >
                  <span className="text-gray-700 truncate">
                    {formData.state || "Select State"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${stateOpen ? "rotate-180" : ""}`}
                  />
                </Buttons>

                <Dropdown
                  isOpen={stateOpen}
                  onClose={() => setStateOpen(false)}
                  style={stateStyle}
                  className="max-h-60 overflow-y-auto"
                >
                  <div className="py-1">
                    {INDIA_STATES.map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, state, city: "" });
                          setStateOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${formData.state === state ? "primary-background text-white font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </Dropdown>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select City
              </label>
              <div className="relative">
                <Buttons
                  type="button"
                  ref={cityRef}
                  onClick={toggleCity}
                  className="w-full border rounded-lg px-3 py-2 flex items-center justify-between text-left h-10 bg-white disabled:bg-gray-50"
                  disabled={!formData.state}
                >
                  <span className="text-gray-700 truncate">
                    {formData.city || "Select City"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${cityOpen ? "rotate-180" : ""}`}
                  />
                </Buttons>

                <Dropdown
                  isOpen={cityOpen}
                  onClose={() => setCityOpen(false)}
                  style={cityStyle}
                  className="max-h-60 overflow-y-auto"
                >
                  <div className="py-1">
                    {formData.state &&
                      CITY_BY_STATE[formData.state]?.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, city });
                            setCityOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${formData.city === city ? "primary-background text-white font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                        >
                          {city}
                        </button>
                      ))}
                  </div>
                </Dropdown>
              </div>
            </div>

            <Buttons
              type="submit"
              className="w-full primary-background white-text py-2 px-4 rounded-lg hover:bg-teal-700"
            >
              Save &amp; Continue
            </Buttons>
          </form>
        </div>
      </div>
    </div>
  );
}
