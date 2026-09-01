export default function validatePassword(password: string) {
  let passwordError = null;
  if (typeof password === "string") {
    if (password.length < 4) {
      passwordError = "Password must be at least 4 symbols";
    }
    if (password.length > 25) {
      passwordError = "Password must be shorter then 25 symbols";
    }
    if (password.search(/[A-Z]/) === -1) {
      passwordError = "Password must contain at least one uppercase letter";
    }
    if (password.search(/[a-z]/) === -1) {
      passwordError = "Password must contain at least one lowercase letter";
    }
    if (password.search(/[0-9]/) === -1) {
      passwordError = "Password must contain at least one number";
    }
  }
  return passwordError;
}
