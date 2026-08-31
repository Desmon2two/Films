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
    <form onSubmit={handleSubmit}>
      <h1>Email:</h1>
      {error.email && <p>{error.email}</p>}
      <input
        type="email"
        name="emailInput"
        id=""
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        onBlur={()=>handleBlur("email")}
      />
      <h1>Password:</h1>
      {error.password && <p>{error.password}</p>}
      <input
        type="password"
        name="passwordInput"
        id=""
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        onBlur={()=>handleBlur("password")}
      />
      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in" : "Login"}
      </button>
      {error && <p>{error.other}</p>}
    </form>
  );
}
