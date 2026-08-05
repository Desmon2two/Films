import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: "../.env", debug: true });
const PORT = process.env.PORT || 3000;
import connectDatabase from "./database/connectDatabase.js";
import authRoute from "./routes/authRouter.js";
import errorHandler from "../errors/errorMiddleware.js"

// MIDDLEWARE
app.use(express.json())

// MOUNTING ROUTERS
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Everything works, right?");
});

// ERROR HANDLER
app.use(errorHandler)

// DATABASE THEN SERVER START
connectDatabase()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(error=>console.error(error))
