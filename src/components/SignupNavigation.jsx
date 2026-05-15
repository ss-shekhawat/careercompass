// src/NavigateToSignupWithQuery.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignupNavigation = () => {
  const { referralCode, testId, promoCode } = useParams();
  const navigate = useNavigate();

  // Console log the testId whenever the component mounts or params change
  useEffect(() => { 
    if (referralCode && testId) {
      // If a promoCode is present, append it after testId separated by '/'
      const codeParam = promoCode ? `${referralCode}/${testId}/${promoCode}` : `${referralCode}/${testId}`;
      navigate(`/signup?code=${codeParam}`, { replace: true });
    } else if (referralCode) {
      navigate(`/signup?code=${referralCode}`, { replace: true });
    } else {
      navigate("/signup", { replace: true });
    }
  }, [referralCode, testId, navigate]);

  return null;
};

export default SignupNavigation;