// Utility to normalize API error messages for display
export const getApiErrorMessage = (err, fallback = 'Something went wrong') => {
  if (!err) return fallback;

  const data = err.data || (err.response && err.response.data) || err;

  if (typeof data === 'string') return data;

  if (data && typeof data === 'object') {
    if (data.message) return data.message;
    if (data.detail) return data.detail;
    if (data.error) return data.error;
  }

  if (err.message) return err.message;

  return fallback;
};
