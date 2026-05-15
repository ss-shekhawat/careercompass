import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/_main.scss";
import "./styles/_themes.scss";

// Public pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import OTPVerification from "./pages/OTPVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PostSignupInstructions from "./pages/PostSignupInstructions";
import StudentAdditionalDetails from "./pages/StudentAdditionalDetails";
import Prepaymentpage from "./pages/Prepaymentpage";
import Subscription from "./pages/Subscription";
import SignupNavigation from "./components/SignupNavigation";
import PrivacyPolicyPage from "./components/Ui/PrivacyPolicyPage";
import Disclaimer from "./components/Ui/Disclaimer";
import ErrorPage from "./pages/ErrorPage";

// Student protected pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentBooking from "./pages/student/StudentBooking";
import StudentSubscription from "./pages/student/StudentSubscription";
import ReportHistory from "./pages/student/ReportHistory";
import ReportDetail from "./pages/student/ReportDetail";
import ResumeAssessment from "./pages/student/ResumeAssessment";
import AssessmentIntroPage from "./pages/AssessmentIntroPage";
import AssessmentInstructionPage from "./pages/student/assessment/AssessmentInstructionPage";
import StartCtestInstructionPage from "./pages/student/assessment/StartCtestInstructionPage";
import ProfileQuestionsPage from "./pages/ProfileQuestionsPage";
import StrengthSelection from "./components/student/StrengthSelection";
import ThankYouScreen from "./components/Ui/ThankYouScreen";

// Admin (minimal — login + stub only)
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardStub from "./pages/admin/AdminDashboardStub";

// Auth wrapper
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div
        className="min-h-screen overflow-x-hidden overflow-y-auto"
        style={{ background: "#F8FAFC" }}
      >
        <Routes>
          {/* ============ PUBLIC ROUTES ============ */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/:referralCode" element={<SignupNavigation />} />
          <Route
            path="/signup/:referralCode/:testId"
            element={<SignupNavigation />}
          />
          <Route
            path="/signup/:referralCode/:testId/:promoCode"
            element={<SignupNavigation />}
          />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/post-signup-intro"
            element={<PostSignupInstructions />}
          />
          <Route
            path="/student-additional-details"
            element={<StudentAdditionalDetails />}
          />
          <Route path="/prepayment" element={<Prepaymentpage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Admin login (public auth gate) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* ============ STUDENT PROTECTED ROUTES ============ */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route
              path="/student/profile-questions"
              element={<ProfileQuestionsPage />}
            />
            <Route
              path="/student/resume-assessment"
              element={<ResumeAssessment />}
            />
            <Route
              path="/student/assessment"
              element={<AssessmentIntroPage />}
            />
            <Route
              path="/student/assessment-introduction"
              element={<AssessmentIntroPage />}
            />
            <Route
              path="/student/assessment-instruction"
              element={<AssessmentInstructionPage />}
            />
            <Route
              path="/student/test-instruction"
              element={<StartCtestInstructionPage />}
            />
            <Route path="/student/report" element={<ReportHistory />} />
            <Route path="/student/report/:id" element={<ReportDetail />} />
            <Route path="/student/strengths" element={<StrengthSelection />} />
            <Route path="/student/thank-you" element={<ThankYouScreen />} />
            <Route path="/student/booking" element={<StudentBooking />} />
            <Route
              path="/student/subscription"
              element={<StudentSubscription />}
            />
          </Route>

          {/* ============ ADMIN PROTECTED ROUTES (minimal) ============ */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboardStub />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          style={{ marginTop: "37px", marginLeft: "0px" }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
