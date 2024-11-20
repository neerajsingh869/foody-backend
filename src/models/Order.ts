import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartItems: [
    {
      menuItemId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  deliveryDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    addressLine1: { type: String, required: true },
  },
  totalAmount: Number,
  status: {
    type: String,
    enum: ["placed", "delivered", "outForDelivery", "inProgress", "paid"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
