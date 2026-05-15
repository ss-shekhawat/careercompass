import { useState } from "react";
import { getBaseurl } from "../utils/Constants"; 
import { useApiErrorHandling } from "./useApiErrorHandling";

const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const { handleError } = useApiErrorHandling();

  const uploadFile = async (file) => {
    if (!file) {
      setError("No file selected");
      return null;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${getBaseurl()}/v1/utils/upload-file`, {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw {
          status: response.status,
          data: errorData,
          message: `HTTP error! Status: ${response.status}`,
        };
      }

      const result = await response.json();
      setUploading(false);

      // ✅ Handle both possible keys (backend-dependent)
      return result.file_url || result.url || null;
    } catch (err) {
      handleError(err);
      setError("Error uploading file. Please try again.");
      setUploading(false);
      return null;
    }
  };

  return { uploadFile, uploading, error };
};

export default useFileUpload;
