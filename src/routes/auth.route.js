const express = require("express");
const router = express.Router();
// const {User} = require("../models/user.model");
// const{checksignup , checksignin} = require("../typecheck/auth.typecheck")
const {authMiddleware} = require("../middleware/auth.middleware")
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const {signup,signin,profile} = require("../controller/auth.controller")

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/profile",authMiddleware,profile)
// router.post("/signup",async(req,res)=>{
//     try{
  
//     const body = req.body
//     if(!body){
//       return res.status(400).json({message : "Please Give the required Input"})
//     }

//     const parsedBody = checksignup.safeParse(body)
//     if(!parsedBody.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//     }
//     const { name, email, password,role } = parsedBody.data;

//     const ExistingUser =  await User.findOne({
//         email: body.email
//     })
//     if(ExistingUser){
//         return res.json({
//             message:"Account Already Exists"
//         })
//     }
    
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const user = await User.create({
//       name,
//       email,
//       hashed_password: hashedPassword,
//       role: role || "staff"
//     });

//     const token = jwt.sign({ id: user._id, email: user.email ,role : user.role}, process.env.JWT_SECRET, {
//       expiresIn: "1d"
//     });

//     res.status(200).json({
//       success: true,
//       message: "User registered successfully",
//       token:"Bearer " + token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role }
//     });

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

// router.post("/signin",async (req,res)=>{
// try{
//     const body = req.body
//     if(!body){
//       return res.status(400).json({message : "Please Give the required Input"})
//     }
    
//     const parsedBody = checksignin.safeParse(body)
//     if(!parsedBody.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//     }
//     const {email,password} = parsedBody.data

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.hashed_password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ id: user._id, email: user.email ,role : user.role}, process.env.JWT_SECRET, {
//       expiresIn: "1d"
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token: "Bearer " + token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role }
//     });

// }catch(error){
//     res.status(500).json({ success: false, message: error.message });
// }
// })

// router.get("/profile",authMiddleware,async (req,res)=>{
//   try{
    
//   const info = await User.findById(req.user_id).select();
//   res.status(200).json({ success: true, info });

//   }catch(error){
//     res.status(500).json({ success: false, message: error.message });
//   }
// })

module.exports = router