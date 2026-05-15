
// Function to get min and max date limits (10–25 years old range)
export const getDateLimits = () => {
  const today = new Date();
  const currentYear = today.getFullYear();

  const maxDate = today; // ✅ max = today's date
  const minDate = new Date(currentYear - 25, today.getMonth(), today.getDate());

  return {
    min: minDate.toISOString().split("T")[0],
    max: maxDate.toISOString().split("T")[0],
  };
};

// Function to validate Date of Birth
export const validateDateOfBirth = (dateString) => {
  if (!dateString) return "Please enter your Date of Birth";

  const inputDate = new Date(dateString);
  const today = new Date();

  if (isNaN(inputDate.getTime())) {
    return "Please enter a valid date";
  }

  if (inputDate > today) {
    return "Date of birth cannot be in the future";
  }

  const age = today.getFullYear() - inputDate.getFullYear();
  const monthDiff = today.getMonth() - inputDate.getMonth();
  const dayDiff = today.getDate() - inputDate.getDate();

  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  if (actualAge < 10) {
    return "You must be at least 10 years old to register";
  }

  if (actualAge > 25) {
    return "Please contact support for registration assistance";
  }

  return null; // Valid date
};

// Normalize and format server ISO timestamps safely to local timezone.
export function normalizeIsoToMs(iso, assumeUtcIfNoTZ = true) {
  if (!iso) return null;
  // Trim microseconds to milliseconds: .123456 -> .123
  const trimmed = iso.replace(/\.(\d{3})\d+/, '.$1');
  // If string has explicit timezone (Z or ±HH:MM), keep it as-is
  const hasTZ = /(?:Z|[+-]\d{2}:?\d{2})$/.test(trimmed);
  if (hasTZ) return trimmed;
  // If caller wants to treat timezone-less strings as UTC, append 'Z'
  return assumeUtcIfNoTZ ? trimmed + 'Z' : trimmed;
}

export const formatDate = (dateStr) => {
  if (!dateStr) return '';

  // Treat backend value as IST already
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';

  return d
    .toLocaleString('en-IN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    })
    .replace(',', '');
};

export default formatDate;



