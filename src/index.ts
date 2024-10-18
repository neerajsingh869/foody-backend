import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary'

import MyUserRoute from "./routes/MyUserRoute";
import MyRestaurantRoute from "./routes/MyRestaurantRoute";

// establish connection between backend and mongodb
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL as string)
  .then(() => console.log("Database connection successful!"));

// configure cloudinary environment
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

/* middleware used to convert request
body into json */
app.use(express.json());

/* middleware used to allow cross origin
resource sharing */
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.json({message: "Health OK!"});
})

app.use("/api/my/user", MyUserRoute);
app.use("/api/my/restaurant", MyRestaurantRoute);

/* start express server and listen
for incoming requests */
app.listen(4000, () => {
  console.log("Server is running on PORT: 4000!");
});
