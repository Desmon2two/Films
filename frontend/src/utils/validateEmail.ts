export default function validateEmail(email: string){
    let emailError = null;
    if (typeof email === "string") {
      if (!email.includes("@") || !email.includes(".")) emailError = "Email must include @ and .";
      if (email.length > 50) {
        emailError = "Email too long";
      }
      if (email.length === 0) {
        emailError = "Email required";
      }
}
   return emailError
}