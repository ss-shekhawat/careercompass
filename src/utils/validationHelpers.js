
export const validatePassword = (password) => {
  if (!password) {
    return "Please enter a password";
  }

  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
  }

  return null; // valid password
};
