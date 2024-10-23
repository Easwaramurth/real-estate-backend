import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://easwaramurthi14cs:cZaDebAZkbBLZ9Kk@test-name-db.kii7i.mongodb.net/?retryWrites=true&w=majority&appName=test-name-db",
    {}
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
//allow JSON data

app.use(cookieParser());

app.listen(3000, () => {
  console.log(`Server is running on Port ${process.env.PORT}!`);
});

app.use("/api/user", userRouter); //api/user
app.use("/api/auth", authRouter); //api/auth
app.use("/api/listing", listingRouter); //api/listing

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//Errors Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
