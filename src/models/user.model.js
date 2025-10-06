const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : {type: String,required : true},
    email : {type :String ,required :true},
    hashed_password : {type :String ,required :true},
    role : {type : String ,enum : ['staff', 'admin'],default :'staff' ,required : false}
})

const User  = mongoose.model("User" , UserSchema)
module.exports = {User}