const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number, // snapshot of price at time of order
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: Number },
    },
    items: [orderItemSchema],

    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "netbanking"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },

    notes: { type: String },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who created the sale/order
    },
  },
  { timestamps: true }
);
const Order  = mongoose.model("Order" , orderSchema)
module.exports = {Order}
