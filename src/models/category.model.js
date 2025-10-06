const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name : {type : String , required: true , unique : true , trim : true},
    description : {type: String ,trim : true}
}, { timestamps: true });

const category  = mongoose.model("category" , categorySchema)
module.exports = {category}