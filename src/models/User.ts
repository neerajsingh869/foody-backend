import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: String,
  addressLine1: String,
  country: String,
  city: String
});

const User = mongoose.model('User', userSchema);

export default User;