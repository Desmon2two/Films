import { useState } from "react";
import type { RegisterStatus } from "../types/RegisterStatusType";
import useAuth from "../auth/useAuth";
import type { ApiError } from "../types/ApiErrorType";
import type { RegisterValidationErrors } from "../types/RegisterValidationErrorsType";
import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";
import validateUsername from "../utils/validateUsername";
import normalizeError from "../utils/normalizeError";
import { redirect } from "react-router-dom";

export default function RegisterPage() {
  const [submitionStatus, setSubmitionStatus] = useState<RegisterStatus>({
    status: "idle",
  });
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validationError, setValidationError] =
    useState<RegisterValidationErrors | null>(null);
  const [serverError, setServerError] = useState<ApiError | null>(null);
  const { register, state } = useAuth();
  async function handleSubmit(event) {
    event.preventDefault();
    setServerError(null);

    const errors: RegisterValidationErrors = {};
    const emailError = validateEmail(email);
    if (emailError) {
      errors.email = emailError;
    }
    const usernameError = validateUsername(username);
    if (usernameError) {
      errors.username = usernameError;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    const hasErrors = Object.keys(errors).length > 0;
    setValidationError(hasErrors ? errors : null);
    if (hasErrors) return;
    setSubmitionStatus({ status: "submitting" });
    try {
      await register(email, password, username);
    } catch (error: unknown) {
      const err = normalizeError(error);
      setSubmitionStatus({ status: "failure", error: err });
      setServerError({ status: err.status, message: err.message });
    }
  }
  function handleBlur(type: string) {
    if (type === "email") {
      const err = validateEmail(email);

      setValidationError((previous) => {
        if (err) {
          return {
            ...previous,
            email: err,
          };
        }

        if (!previous) return null;

        const newErrors = { ...previous };
        delete newErrors.email;

        return Object.keys(newErrors).length > 0 ? newErrors : null;
      });
    }
    if (type === "password") {
      const err = validatePassword(password);

      setValidationError((previous) => {
        if (err) {
          return {
            ...previous,
            password: err,
          };
        }

        if (!previous) return null;

        const newErrors = { ...previous };
        delete newErrors.password;

        return Object.keys(newErrors).length > 0 ? newErrors : null;
      });
    }
    if (type === "username") {
      const err = validateUsername(username);

      setValidationError((previous) => {
        if (err) {
          return {
            ...previous,
            username: err,
          };
        }

        if (!previous) return null;

        const newErrors = { ...previous };
        delete newErrors.username;

        return Object.keys(newErrors).length > 0 ? newErrors : null;
      });
    }
    if (type === "confirmPassword") {
      const err =
        password !== confirmPassword ? "Passwords do not match" : null;

      setValidationError((previous) => {
        if (err) {
          return {
            ...previous,
            confirmPassword: err,
          };
        }

        if (!previous) return null;

        const newErrors = { ...previous };
        delete newErrors.confirmPassword;

        return Object.keys(newErrors).length > 0 ? newErrors : null;
      });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Email:</p>
      <input
        type="email"
        name="emailInput"
        id=""
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur("email")}
      />
      {validationError?.email && <p>{validationError.email}</p>}
      <p>Username:</p>
      <input
        type="text"
        name="usernameInput"
        id=""
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => handleBlur("username")}
      />
      {validationError?.username && <p>{validationError.username}</p>}
      <p>Password:</p>
      <input
        type="password"
        name=""
        id="passwordInput"
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur("password")}
      />
      {validationError?.password && <p>{validationError.password}</p>}
      <p>Confirm password:</p>
      <input
        type="password"
        name=""
        id="confirmPasswordInput"
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => handleBlur("confirmPassword")}
      />
      {validationError?.confirmPassword && (
        <p>{validationError.confirmPassword}</p>
      )}
      <button
        type="submit"
        disabled={submitionStatus.status === "submitting"}
        style={{height: 30}}
      >Submit</button>
      {serverError && <h1>500 Internal server error please try again</h1>}
    </form>
  );
}
