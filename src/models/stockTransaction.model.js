const mongoose = require("mongoose")
const Product = require("../models/product.model")
const category = require("../models/category.model")

const StockTransaction = new mongoose.Schema({
    productId : { type: mongoose.Schema.Types.ObjectId , required : true ,ref : "Product"},
    // productSku : {type : String, ref : "Product" ,required : true},
    type: {type : String , enum: ["IN","OUT"], required:true},
    quantity :{type: Number, required : true, min : 1},
    reason : {type : String , enum: ["PURCHASE", "SALE", "RETURN", "DAMAGED", "ADJUSTMENT"], default : "ADJUSTMENT"},
    performedBy : {type: mongoose.Schema.Types.ObjectId , required : true ,ref : "user" }
},{ timestamps: true })
const Stock = mongoose.model("Stock",StockTransaction)
module.exports = {Stock}