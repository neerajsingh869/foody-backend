import { Request, Response } from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import Restaurant from "../models/Restaurant";
import Order from "../models/Order";

const updateMyRestaurantOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    let restaurant = await Restaurant.findById(order.restaurant);
    if (req.userId !== restaurant?.user?._id.toString()) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error updating order status." });
  }
};

const getMyRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching orders." });
  }
};

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    let restaurant = await Restaurant.findOne({ user: req.userId });

    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching restaurant." });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
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

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    existingRestaurant.restaurantName = req.body.restaurantName;
    existingRestaurant.city = req.body.city;
    existingRestaurant.country = req.body.country;
    existingRestaurant.deliveryPrice = req.body.deliveryPrice;
    existingRestaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    existingRestaurant.cuisines = req.body.cuisines;
    existingRestaurant.menuItems = req.body.menuItems;
    existingRestaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      existingRestaurant.imageUrl = imageUrl;
    }

    await existingRestaurant.save();

    res.status(200).json(existingRestaurant);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error creating restaurant." });
  }
};

export default {
  updateMyRestaurantOrderStatus,
  getMyRestaurantOrders,
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};
