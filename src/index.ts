import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import MyUserRoute from "./routes/MyUserRoute";

// establish connection between backend and mongodb
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL as string)
  .then(() => console.log("Database connection successful!"));

const app = express();

/* middleware used to convert request
body into json */
app.use(express.json());

/* middleware used to allow cross origin
resource sharing */
app.use(cors());

app.use("/api/my/user", MyUserRoute);

/* start express server and listen
for incoming requests */
app.listen(4000, () => {
  console.log("Server is running on PORT: 4000!");
});
