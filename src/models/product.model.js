const mongoose = require("mongoose");
const category = require("../models/category.model")
const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true,trim: true },
  sku: { type: String, unique: true, required: true ,trim: true},
  category_id: { type: mongoose.Schema.Types.ObjectId , required : true ,ref : "category"},
  price: { type: Number, required: true },
  stock_quantity: { type: Number, default: 0 },
}, { timestamps: true });

const Product  = mongoose.model("Product" , productSchema)

module.exports = {Product}