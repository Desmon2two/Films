import { ValidationError } from "../errors/validationError.js";

function validateUserPatch(userData) {
  const objectFields = Object.getOwnPropertyNames(userData);
  if (objectFields.length === 0) throw new ValidationError("Nothing to update");
  const allowedFields = ["username", "displayName", "profilePic", "bio"];
  const isAllowed = objectFields.every((field) =>
    allowedFields.includes(field),
  );
  if (!isAllowed) throw new ValidationError("Invalid profile field");
if(userData.username !== undefined){

    if (
        typeof userData.username !== "string" ||
        userData.username.length < 1 ||
        userData.username.length > 25
    )
    throw new ValidationError("Invalid username");
}
if(userData.displayName !== undefined){

    if (
        typeof userData.displayName !== "string" ||
        userData.displayName.length < 1 ||
        userData.displayName.length > 25
    )
    throw new ValidationError("Invalid displayName");
}
if(userData.profilePic !== undefined){

    if (typeof userData.profilePic !== "string" || userData.profilePic.length < 1)
        throw new ValidationError("Invalid profile picture");
}
if(userData.bio !== undefined){

    if (typeof userData.bio !== "string" || userData.bio.length > 250)
        throw new ValidationError("Invalid bio");
}
  return
}
function validateCredentialsPatch(userData) {
    const objectFields = Object.getOwnPropertyNames(userData);
    if (objectFields.length === 0) throw new ValidationError("Nothing to update");
    const allowedFields = ["email", "password"];
    const isAllowed = objectFields.every((field) =>
        allowedFields.includes(field),
);
if (!isAllowed) throw new ValidationError("Invalid profile field");
const {email, password} = userData
if(email !== undefined){
    if (
        typeof email !== "string" ||
        email.length < 1 ||
        email.length > 50 ||
        (!email.includes("@gmail.com") &&
        !email.includes("@yahoo.com") &&
        !email.includes("@yandex.ru") &&
        !email.includes("@mail.ru"))
    )
    throw new ValidationError("Invalid email");
}
if(password !== undefined){
    if (
        typeof password !== "string" ||
        password.length < 1 ||
        password.length > 25
    )
    throw new ValidationError("Invalid password");
}
  return
}
export default { validateUserPatch, validateCredentialsPatch };
