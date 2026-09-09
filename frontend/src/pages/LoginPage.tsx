import { useState } from "react";
import useAuth from "../auth/useAuth";
import type { LoginErrors } from "../types/LoginErrorsType";
import validateCredentials from "../utils/validateCredentials";

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState<LoginErrors>({
    email: null,
    password: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logIn } = useAuth();
  async function handleSubmit(event) {
    event.preventDefault();
    const validated = validateCredentials(emailInput, passwordInput);

    if (validated.email !== null || validated.password !== null) {
      setError(validated);
      return;
    }
    try {
      setIsSubmitting(true);
      await logIn(emailInput, passwordInput);
    } catch (err) {
      setError({
        email: validated.email,
        password: validated.password,
        other: String(err),
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleBlur(field: "email" | "password") {
    const validated = validateCredentials(emailInput, passwordInput);

    if (field === "password") {
      setError((previous) => ({
        email: previous.email,
        password: validated.password,
      }));
    }
    if (field === "email") {
      setError((previous) => ({
        email: validated.email,
        password: previous.password,
      }));
    }
  }
  return (
    <div className="login-page">
      <form
        onSubmit={handleSubmit}
        className="login-page__login-form"
      >
        <p>Email:</p>
        {error.email && <p className="login-form__error-msg error-msg">{error.email}</p>}
        <input
          type="email"
          name="emailInput"
          placeholder="Email:"
          id=""
          className="login-form__email-input"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        <p>Password:</p>
        {error.password && <p className="login-form__error-msg error-msg">{error.password}</p>}
        <input
          type="password"
          name="passwordInput"
          placeholder="Password:"
          id=""
          className="login-form__password-input"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onBlur={() => handleBlur("password")}
        />
        <button
          className="login-form__submit button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in" : "Login"}
        </button>
        {error && <p className="login-form__error-msg error-msg">{error.other}</p>}
      </form>
    </div> 
  );
}
