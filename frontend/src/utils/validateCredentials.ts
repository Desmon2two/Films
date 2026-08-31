import type { LoginErrors } from "../types/LoginErrorsType";

export default function validateCredentials(
  email: string,
  password: string,
): LoginErrors {
  let emailError = null;
  let passwordError = null;

if (typeof email === "string") {
      if (!email.includes("@")) emailError = "Email must include @";
      if (email.length > 50) {
        emailError = "Email too long";
      }
      if (email.length === 0) {
        emailError = "Email required";
      }
}

if (typeof password === "string") {
      if (password.length < 4) {
        passwordError = "Password must be at least 4 symbols";
      }
      if (password.length > 25) {
        passwordError = "Password must be shorter then 25 symbols";
      }
}
  return {
    email: emailError,
    password: passwordError,
  };
}
