import { Request, Response } from "express";

import User from "../models/User";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    // check if user already exists in database
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists." });
    }

    // if user doesn't exist, create user
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error while creating user." });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    // get the necessary details from request object
    const {name, addressLine1, country, city} = req.body;

    // fetch user from database on the basis of userId
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // update & save user details
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error updating user." });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
};
