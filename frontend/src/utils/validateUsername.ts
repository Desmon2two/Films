export default function validateUsername(username: string) {
  let usernameError = null;
  if (username.length < 3) {
    usernameError = "Username must be at least 3 characters long";
  }
  if (username.length > 25) {
    usernameError = "Username can't be more than 25 characters long";
  }
  return usernameError;
}
