import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ERROR_CODES } from "../utils/errorCodes";

export const useApiErrorHandling = () => {
  const navigate = useNavigate();

  const handleError = (error) => {
    console.error("API Error:", error);

    if (!navigator.onLine || error?.name === "TypeError" || error?.message?.includes("fetch")) {
      toast.error("You appear to be offline. Please connect to the internet and try again.");
      return ERROR_CODES.NETWORK_ERROR;
    }

    const status = error?.status || error?.data?.status || error?.statusCode;

    switch (status) {
      case 401:
      case 403:
        if (error?.data?.error === "invalid_request") {
          toast.error(error?.data?.message || "This action is restricted to your user role.");
          return ERROR_CODES.UNAUTHENTICATED;
        }
        toast.error("Your session has expired. Please log in again.");
        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 2000);
        return ERROR_CODES.UNAUTHENTICATED;
      case 409:
        toast.error("You have already completed this test.");
        return ERROR_CODES.API_VALIDATION_ERROR;
      case 500:
        toast.error("A server error occurred. Please try again later.");
        return ERROR_CODES.SERVER_ERROR;
      default:
        break;
    }

    if (error?.name === "FetchError" || error?.type === "NetworkError") {
      toast.error("There was a problem connecting to the server. Please check your connection.");
      return ERROR_CODES.NETWORK_ERROR;
    }

    const errorMessage =
      error?.data?.message ||
      error?.data?.detail ||
      "An unknown error occurred. Please try again.";
    toast.error(errorMessage);
    return ERROR_CODES.UNKNOWN_ERROR;
  };

  return { handleError };
};
