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

    // if user doesn't exist
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error while creating user." });
  }
};

export default {
  createCurrentUser,
};
