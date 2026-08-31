import { useState } from "react";
import type { RegisterStatus } from "../types/RegisterStatusType";
import useAuth from "../auth/useAuth";

export default function RegisterPage() {
  const [status, setStatus] = useState<RegisterStatus>({ status: "idle" });
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { logIn } = useAuth();
  function handleSubmit() {
    if (password !== confirmPassword)
      setValidationError("Passwords do not match");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="emailInput"
        id=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        name="nameInput"
        id=""
      />
      <input
        type="password"
        name=""
        id="passwordInput"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        name=""
        id="confirmPasswordInput"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit"></button>
    </form>
  );
}
