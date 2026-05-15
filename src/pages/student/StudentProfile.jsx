import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
  Edit2,
  Save,
  X,
  Camera,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import Buttons from "../../components/Ui/Buttons";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../../redux/services/studentApi";
import { useApiErrorHandling } from "../../hooks/useApiErrorHandling";
import { INDIA_STATES, CITY_BY_STATE } from "../../data/locations";

const StudentProfile = () => {
  const navigate = useNavigate();
  const { handleError } = useApiErrorHandling();

  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPwdSection, setShowPwdSection] = useState(false);
  const [pwdData, setPwdData] = useState({
    current: "",
    newPwd: "",
    confirm: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        full_name: profile.full_name || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        date_of_birth: profile.date_of_birth || "",
        class_grade: profile.class_grade || "",
        board: profile.board || "",
        state: profile.state || "",
        city: profile.city || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData((p) => ({ ...p, state: value, city: "" }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name || undefined,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth || undefined,
        class_grade: formData.class_grade
          ? String(formData.class_grade)
          : undefined,
        board: formData.board || undefined,
        state: formData.state || undefined,
        city: formData.city || undefined,
        role: "student",
      };
      Object.keys(payload).forEach((k) => {
        if (
          payload[k] === "" ||
          payload[k] === null ||
          payload[k] === undefined
        )
          delete payload[k];
      });
      await updateProfile(payload).unwrap();
      toast.success("Profile updated!");
      setIsEditing(false);
      refetch();
    } catch (err) {
      handleError(err);
    }
  };

  const handlePasswordChange = async () => {
    if (!pwdData.current || !pwdData.newPwd || !pwdData.confirm) {
      toast.error("Please fill all password fields");
      return;
    }
    if (pwdData.newPwd !== pwdData.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (pwdData.newPwd.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    try {
      await changePassword({
        current_password: pwdData.current,
        new_password: pwdData.newPwd,
      }).unwrap();
      toast.success("Password changed successfully");
      setPwdData({ current: "", newPwd: "", confirm: "" });
      setShowPwdSection(false);
    } catch (err) {
      handleError(err);
    }
  };

  const handleAvatarUpload = async (e) => {
    toast.info("Avatar upload coming soon!");
  };

  const handleFocus = (e) => {
    e.target.style.border = "1px solid #2563EB";
    e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
  };
  const handleBlur = (e) => {
    e.target.style.border = "1px solid #E2E8F0";
    e.target.style.boxShadow = "none";
  };

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  const Field = ({
    label,
    icon: Icon,
    name,
    type = "text",
    placeholder,
    disabled,
    options,
  }) => (
    <div>
      <label
        className="block text-sm font-medium mb-1.5"
        style={{ color: "#0F172A" }}
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#94A3B8" }}
          />
        )}
        {options ? (
          <select
            name={name}
            value={formData[name] || ""}
            onChange={handleInputChange}
            disabled={disabled || !isEditing}
            className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm appearance-none disabled:opacity-60"
            style={{
              border: "1px solid #E2E8F0",
              background: "white",
              color: "#0F172A",
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] || ""}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled || !isEditing}
            className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm disabled:opacity-60"
            style={{
              border: "1px solid #E2E8F0",
              background: "white",
              color: "#0F172A",
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <StudentLayout title="Profile">
        <div className="text-center py-10 text-sm" style={{ color: "#64748B" }}>
          Loading...
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title="My Profile">
      <div className="max-w-4xl mx-auto">
        {/* Header card with avatar */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-5 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: "-30px",
              right: "-30px",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          >
            <svg width="200" height="200" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <polygon
                points="40,16 48,36 64,40 48,44 40,64 32,44 16,40 32,36"
                fill="white"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  style={{ border: "3px solid rgba(255,255,255,0.3)" }}
                />
              ) : (
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                >
                  {(profile?.full_name || "S").charAt(0).toUpperCase()}
                </div>
              )}
              <label
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all"
                style={{
                  background: "#FBBF24",
                  color: "#78350F",
                  border: "2px solid white",
                }}
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold">
                {profile?.full_name || "Student"}
              </h1>
              <p className="text-sm" style={{ color: "#BFDBFE" }}>
                {profile?.email}
              </p>
              {profile?.class_grade && (
                <span
                  className="inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#FBBF24",
                  }}
                >
                  Class {profile.class_grade}
                </span>
              )}
            </div>

            {!isEditing ? (
              <Buttons
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                style={{
                  background: "white",
                  color: "#2563EB",
                  border: "none",
                }}
              >
                <Edit2 className="w-4 h-4" /> Edit
              </Buttons>
            ) : (
              <div className="flex gap-2">
                <Buttons
                  onClick={() => {
                    setIsEditing(false);
                    refetch();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    border: "none",
                  }}
                >
                  <X className="w-4 h-4" /> Cancel
                </Buttons>
                <Buttons
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    background: "#FBBF24",
                    color: "#78350F",
                    border: "none",
                  }}
                >
                  <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save"}
                </Buttons>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div
          className="bg-white rounded-xl p-1.5 mb-5 inline-flex gap-1"
          style={cardStyle}
        >
          {[
            { key: "personal", label: "Personal Info" },
            { key: "academic", label: "Academic" },
            { key: "security", label: "Security" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-transparent border-none cursor-pointer"
              style={
                activeTab === t.key
                  ? { background: "#EFF6FF", color: "#2563EB" }
                  : { background: "transparent", color: "#64748B" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Personal Info */}
        {activeTab === "personal" && (
          <div className="bg-white rounded-xl p-6" style={cardStyle}>
            <h2
              className="text-base font-semibold mb-5"
              style={{ color: "#0F172A" }}
            >
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="First Name"
                icon={User}
                name="first_name"
                placeholder="First name"
              />
              <Field
                label="Last Name"
                icon={User}
                name="last_name"
                placeholder="Last name"
              />
              <Field
                label="Email"
                icon={Mail}
                name="email"
                type="email"
                disabled
                placeholder="Email"
              />
              <Field
                label="Phone Number"
                icon={Phone}
                name="phone_number"
                type="tel"
                placeholder="10-digit phone"
              />
              <Field
                label="Date of Birth"
                icon={Calendar}
                name="date_of_birth"
                type="date"
              />
              <Field
                label="State"
                icon={MapPin}
                name="state"
                options={INDIA_STATES}
              />
              <Field
                label="City"
                icon={MapPin}
                name="city"
                options={
                  formData.state ? CITY_BY_STATE[formData.state] || [] : []
                }
              />
            </div>
          </div>
        )}

        {/* Academic */}
        {activeTab === "academic" && (
          <div className="bg-white rounded-xl p-6" style={cardStyle}>
            <h2
              className="text-base font-semibold mb-5"
              style={{ color: "#0F172A" }}
            >
              Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Class"
                icon={GraduationCap}
                name="class_grade"
                options={["8", "9", "10", "11", "12"]}
              />
              <Field
                label="Education Board"
                icon={BookOpen}
                name="board"
                options={["CBSE", "ICSE", "IGCSE", "NIOS", "IB", "State Board"]}
              />
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="bg-white rounded-xl p-6" style={cardStyle}>
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-base font-semibold"
                style={{ color: "#0F172A" }}
              >
                Security
              </h2>
              {!showPwdSection && (
                <Buttons
                  onClick={() => setShowPwdSection(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold"
                  style={{
                    background: "#EFF6FF",
                    color: "#2563EB",
                    border: "none",
                  }}
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </Buttons>
              )}
            </div>

            {!showPwdSection ? (
              <div
                className="rounded-lg p-4 flex items-center gap-3"
                style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#DBEAFE" }}
                >
                  <Lock className="w-5 h-5" style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#0F172A" }}
                  >
                    Password
                  </p>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    Last changed recently. Click "Change Password" to update.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Current */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#0F172A" }}
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: "#94A3B8" }}
                    />
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={pwdData.current}
                      onChange={(e) =>
                        setPwdData({ ...pwdData, current: e.target.value })
                      }
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                      style={{
                        border: "1px solid #E2E8F0",
                        background: "white",
                        color: "#0F172A",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((p) => !p)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent border-none cursor-pointer"
                      style={{ color: "#94A3B8" }}
                    >
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* New */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#0F172A" }}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: "#94A3B8" }}
                    />
                    <input
                      type={showNew ? "text" : "password"}
                      value={pwdData.newPwd}
                      onChange={(e) =>
                        setPwdData({ ...pwdData, newPwd: e.target.value })
                      }
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                      style={{
                        border: "1px solid #E2E8F0",
                        background: "white",
                        color: "#0F172A",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((p) => !p)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent border-none cursor-pointer"
                      style={{ color: "#94A3B8" }}
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#0F172A" }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: "#94A3B8" }}
                    />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={pwdData.confirm}
                      onChange={(e) =>
                        setPwdData({ ...pwdData, confirm: e.target.value })
                      }
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none transition-all duration-150 text-sm"
                      style={{
                        border: "1px solid #E2E8F0",
                        background: "white",
                        color: "#0F172A",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent border-none cursor-pointer"
                      style={{ color: "#94A3B8" }}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Buttons
                    onClick={() => {
                      setShowPwdSection(false);
                      setPwdData({ current: "", newPwd: "", confirm: "" });
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{
                      border: "1px solid #E2E8F0",
                      color: "#475569",
                      background: "white",
                    }}
                  >
                    Cancel
                  </Buttons>
                  <Buttons
                    onClick={handlePasswordChange}
                    disabled={isChangingPassword}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2"
                    style={{
                      background: isChangingPassword ? "#93C5FD" : "#2563EB",
                      border: "none",
                    }}
                  >
                    {isChangingPassword ? (
                      "Updating..."
                    ) : (
                      <>
                        Update Password <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Buttons>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;
