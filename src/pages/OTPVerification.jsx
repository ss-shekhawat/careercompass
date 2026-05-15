import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useVerifyOtpMutation } from '../redux/services/authApi';
import { showToast } from '../components/Ui/Toast';
import { useDispatch } from 'react-redux';
import { userLoginSuccess, saveAuthToken } from '../redux/reducers/userInfo/userInfoSlice';
import { useGetProfileQuery } from '../redux/services/studentApi';
import { loadRazorpayScript } from "../utils/razorpay";
import { getApiErrorMessage } from "../utils/apiError";
import { useInitiatePaymentMutation, useVerifyPaymentMutation, useLazyVerifyCodeQuery } from "../redux/services/paymentApi";
import PromoCodePopup from '../components/Ui/PromoCodePopup';
import {  useResendOtpMutation } from "../redux/services/authApi";

function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [verifyOtp, { isLoading: isVerifyingApi }] = useVerifyOtpMutation();
  const [initiatePayment] = useInitiatePaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [triggerVerifyCode] = useLazyVerifyCodeQuery();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);
  const [otpResponse, setOtpResponse] = useState(null);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);
  const [promoServerError, setPromoServerError] = useState("");
  const [initialPromoValue, setInitialPromoValue] = useState("");

  const {
    data: profileData,
    isSuccess: profileSuccess,
    error: profileError,
  } = useGetProfileQuery(undefined, {
    skip: !shouldFetchProfile,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const email = location.state?.email || searchParams.get('email') || '';
  const phone = location.state?.phone || searchParams.get('phone') || '';
  const hasOrganization = location.state?.hasOrganization || false;

  // Handle payment after profile is fetched
  const handlePayment = async (plan, user) => {

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      console.error("❌ Razorpay script failed to load");
      showToast("Razorpay SDK failed to load. Are you online?", "error");
      navigate("/prepayment", { state: { openPlan: true } });
      return;
    }

    // Double check Razorpay is available
    if (typeof window.Razorpay === 'undefined') {
      console.error("❌ Razorpay not available on window");
      showToast("Payment system not ready. Please try again.", "error");
      navigate("/prepayment", { state: { openPlan: true } });
      return;
    }

    // Determine promoCode here so it's visible to catch block as well
    const promoCode = user?.promo_code || localStorage.getItem("userPromoCode") || "";

    try {
        showToast("Initiating payment...", "info");

        const payload = {
          product_id: plan.productId,
          promo_code: promoCode || undefined,
        };

      const orderData = await initiatePayment(payload).unwrap();

      // Handle FREE flow (when promo gives 100% discount)
      if (orderData.key_id === "FREE") {
        showToast("Promo code applied! Access granted for free.", "success");
        localStorage.removeItem("selectedPlan");
        localStorage.removeItem("userPromoCode");
        navigate("/student-additional-details");
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Career Mitra",
        description: `Payment for ${plan.name}`,
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            showToast("Payment Successful!", "success");
            localStorage.removeItem("selectedPlan");
            localStorage.removeItem("userPromoCode");
            navigate("/student-additional-details");
          } catch (error) {
            console.error("❌ Verification failed", error);
            showToast("Payment verification failed. Please contact support.", "error");
            navigate("/prepayment", { state: { openPlan: true } });
          }
        },
        prefill: {
          name: user?.full_name || user?.name || "",
          email: user?.email || "",
          contact: user?.phone_number || user?.phone || "",
        },
        theme: {
          color: "#0F766E",
        },
        modal: {
          ondismiss: function () {
            showToast("Payment Cancelled", "info");
            navigate("/prepayment", { state: { openPlan: true } });
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("❌ Payment initiation failed:", error);
      const errorMessage = getApiErrorMessage(error, "Could not initiate payment");

      // If promo validation failed, allow re-entry instead of bailing out
      const lower = (errorMessage || "").toLowerCase();
      const isPromoError = /promo|coupon|invalid code|invalid promo|code invalid/.test(lower);
      if (isPromoError) {
        setInitialPromoValue(promoCode || localStorage.getItem("userPromoCode") || "");
        setPromoServerError(errorMessage);
        setPendingPlan(plan);
        setShowPromoPopup(true);
        return;
      }

      showToast(errorMessage, "error");
      navigate("/prepayment", { state: { openPlan: true } });
    }
  };

  // Handle profile fetch success
  useEffect(() => {
    if (profileSuccess && profileData && otpResponse) {
      
      // Save user data to Redux
      dispatch(
        userLoginSuccess({
          access_token: otpResponse.access_token,
          role: otpResponse.role || "student",
          user: profileData,
        })
      );

      setShouldFetchProfile(false);
      setOtpResponse(null);
      // If a promo code exists, verify it and auto-initiate payment for the returned product
      (async () => {
        try {
          const promo = profileData?.promo_code || localStorage.getItem("userPromoCode") || "";
          if (promo) {
            const verifyResp = await triggerVerifyCode(promo).unwrap();
            if (verifyResp?.is_valid && verifyResp?.product_id) {
              const promoPlan = { productId: verifyResp.product_id, name: "Promo Plan" };
              await handlePayment(promoPlan, profileData);
              return;
            }
          }
        } catch (err) {
          console.warn("Promo verify failed:", err);
        }
      })();
      if (hasOrganization) {
        navigate("/student-additional-details");
        return;
      }
      const savedPlan = localStorage.getItem("selectedPlan");
      if (savedPlan) {
        setPendingPlan(JSON.parse(savedPlan));
        setShowPromoPopup(true);
      } else {
        navigate("/prepayment", { state: { openPlan: true } });
      }
    } else if (profileError && otpResponse) {
      console.error("❌ Profile fetch failed:", profileError);
      showToast(
        "OTP verified but failed to fetch profile. Please try logging in.",
        "error"
      );
      setShouldFetchProfile(false);
      setOtpResponse(null);
      navigate("/login");
    }
  }, [profileSuccess, profileData, profileError, otpResponse, dispatch, navigate, hasOrganization]);

  const handleVerify = async () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      showToast('Please enter all 6 digits', 'error');
      return;
    }

    setIsVerifying(true);

    try {
      
      // Verify OTP
      const payload = { otp: otpCode };
      if (email) payload.email = email;
      if (phone) payload.phone = phone;

      const resp = await verifyOtp(payload).unwrap();

      showToast('OTP verified successfully!', 'success');

      // Save auth token
      if (resp?.access_token) {
        dispatch(saveAuthToken(resp.access_token));
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (resp.user) {
          dispatch(
            userLoginSuccess({
              access_token: resp.access_token,
              role: resp.role || "student",
              user: resp.user,
            })
          );
          // If there's a promo code (from user object or localStorage), verify it and auto-initiate payment if the promo maps to a product
          (async () => {
            try {
              const promo = resp.user?.promo_code || localStorage.getItem("userPromoCode") || "";
              if (promo) {
                const verifyResp = await triggerVerifyCode(promo).unwrap();
                if (verifyResp?.is_valid && verifyResp?.product_id) {
                  const promoPlan = { productId: verifyResp.product_id, name: "Promo Plan" };
                  await handlePayment(promoPlan, resp.user);
                  return;
                }
              }
            } catch (err) {
              console.warn("Promo verify failed:", err);
            }
          })();
          if (hasOrganization) {
            navigate("/student-additional-details");
            return;
          }
          const savedPlan = localStorage.getItem("selectedPlan");
          if (savedPlan) {
            setPendingPlan(JSON.parse(savedPlan));
            setShowPromoPopup(true);
          } else {
            // If user didn't choose a plan before signup, open prepayment page
            // and instruct it to show the plan modal so the user can select a plan
            navigate("/prepayment", { state: { openPlan: true } });
          }
        } else {
          setOtpResponse({
            access_token: resp.access_token,
            role: resp.role || "student",
          });
          setShouldFetchProfile(true);
        }
      } else {
        console.error("❌ No token in response");
        showToast("Verification incomplete. Please try logging in.", "warning");
        navigate("/login");
      }
    } catch (error) {
      console.error("❌ OTP verification error:", error);
      const errorMsg = error?.data?.detail || error?.data?.message || "OTP verification failed";
      showToast(errorMsg, "error");
    } finally {
      setIsVerifying(false);
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  const handleResend = async () => {
    try {
      const payload = {};
      if (email) payload.email = email;
      if (phone) payload.phone = phone;

      let reason = location.state?.reason || searchParams.get('reason') || 'verification';
      if (!['verification', 'password_reset'].includes(reason)) {
        reason = 'verification';
      }
      payload.reason = reason;

      const resp = await resendOtp(payload).unwrap();
      showToast(resp?.message || 'OTP resent successfully', 'success');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      const msg = getApiErrorMessage(err, 'Failed to resend OTP');
      showToast(msg, 'error');
    }
  };

  // Handlers for PromoCodePopup
  const handlePromoApply = (promo) => {
    localStorage.setItem("userPromoCode", promo);
    setShowPromoPopup(false);
    if (pendingPlan) {
      setTimeout(() => handlePayment(pendingPlan, profileData), 300);
    } else {
      navigate("/prepayment", { state: { openPlan: true } });
    }
  };

  const handlePromoSkip = () => {
    localStorage.removeItem("userPromoCode");
    setShowPromoPopup(false);
    if (pendingPlan) {
      setTimeout(() => handlePayment(pendingPlan, profileData), 300);
    } else {
      navigate("/subscription");
    }
  };

  return (
    <>
      <PromoCodePopup
        isOpen={showPromoPopup}
        onApply={handlePromoApply}
        onSkip={handlePromoSkip}
        initialPromo={initialPromoValue}
        serverError={promoServerError}
      />
      <div
        className={`min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4 transition-all duration-300 ease-out ${showPromoPopup ? 'pointer-events-none select-none blur-sm scale-95 opacity-70' : ''}`}
        aria-hidden={showPromoPopup}
      >
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-full mb-4">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Verify Your Code
            </h1>
            <p className="text-gray-600 text-xs sm:text-base">
              Please enter the 6-digit code sent to {email || phone || 'your device'}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-8 h-10 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 hover:border-gray-400"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying || isVerifyingApi}
              className={`w-full py-2.5 sm:py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isComplete && !isVerifying
                  ? 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isVerifying || isVerifyingApi ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={isResending}
                className={`text-teal-600 font-medium hover:text-teal-700 hover:underline transition-colors ${isResending ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isResending ? 'Resending...' : 'Resend Code'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPVerification;