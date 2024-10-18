import { Request, Response } from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import Restaurant from "../models/Restaurant";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      console.log(existingRestaurant);
      return res
        .status(409)
        .json({ message: "User restaurant already exists." });
    }

    // upload image to cloudinary and get the url
    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error creating restaurant." });
  }
};

const uploadImage = async (file: Express.Multer.File): Promise<any> => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createMyRestaurant,
};
