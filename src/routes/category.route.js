const express = require("express");
const router = express.Router();
// const {category} = require("../models/category.model")
const {authMiddleware} = require("../middleware/auth.middleware")
// const{checkCategory,checkCategoryId,checkupdatecategory} = require("../typecheck/category.typecheck")
const {createcategory,getcategory,updatecategory,deletecategory} = require("../controller/category.controller")


router.post("/createcategory",authMiddleware,createcategory)
router.get("/getcategory",authMiddleware,getcategory)
router.put("/updatecategory/:id" ,authMiddleware,updatecategory)
router.delete("/deletecategory/:id",authMiddleware,deletecategory)

// router.post("/createcategory",authMiddleware,async(req,res)=>{
//     try{
        
//         const UserRole = req.user_role
//         if(UserRole !== "admin"){
//           return  res.status(401).json({message : "Not Authorized"})
//         }

//         const body = req.body
//         if(!body){
//           return res.status(400).json({message : "Please give the Body"})
//         }

//         const parsedBody = checkCategory.safeParse(body)
//          if(!parsedBody.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//         }
//         const {name ,description} = parsedBody.data
        
//         const existing = await category.findOne({ name : name });
//         if (existing) {
//           return res.status(400).json({ message: "Category already exists" });
//         }

//         const Category = new category({ name, description });
//         await Category.save();
        
//         res.status(201).json({ message: "Category created successfully", Category : Category });

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })


// router.get("/getcategory",authMiddleware,async(req,res)=>{
// try{
//     const pageNumber = parseInt(req.query.page) || 1;
//     const limitNumber = Math.min(parseInt(req.query.limit) || 10, 100); // cap at 100
//     const skip = (pageNumber - 1) * limitNumber;

//     const Categories = await category.find().sort({ createdAt: -1 }).skip(skip).limit(limitNumber);      

//     if (!Categories) return res.status(404).json({ message: "Categories not found" });
//     if(Categories.length == 0){
//       return res.status(400).json({message : "No Categories Found"})
//     }
    
//     res.status(200).json({ Categories : Categories });

// }catch(error){
//     res.status(500).json({ success: false, message: error.message });
// }
// })

// router.put("/updatecategory/:id" ,authMiddleware,async(req,res)=>{
//     try{
//         const UserRole = req.user_role
//         if(UserRole !== "admin"){
//           return res.status(401).json({message : "Not Authorized"})
//         }

//         const {id} = req.params
//         const Body = req.body

//         if(!Body || !id){
//           return res.status(400).json({message : "Please enter the required Input"})
//         }

//         const parsedId = checkCategoryId.safeParse({id : id.trim()}) 
//         const parsedData = checkupdatecategory.safeParse(Body) 
//          if(!parsedId.success){
//            return res.status(400).json({
//             message:"Incorrect Id"
//         })
//         }

//         if(!parsedData.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//         }

//         const updatedcategory = await category.findOneAndUpdate(
//           { _id: parsedId.data.id }, 
//           parsedData.data, 
//           { new: true , runValidators: true } 
//         );
//         if (!updatedcategory) return res.status(404).json({ message: "Category not found" });

//         res.status(200).json({ message: "Category updated", updatedcategory });

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

// router.delete("/deletecategory/:id",authMiddleware,async(req,res)=>{
//     try{
//         const UserRole = req.user_role
//         if(UserRole !== "admin"){
//           return  res.status(401).json({message : "Not Authorized"})
//         }

//         const {id} = req.params
//         if(!id){
//           return res.status(400).json({message : "Please Enter CategoryId "})
//         }
//         const parsedId = checkCategoryId.safeParse({id : id.trim()})
//          if(!parsedId.success){
//            return res.status(400).json({
//             message:"Incorrect Id"
//         })
//         }

//         const Category = await category.findOneAndDelete({ _id: parsedId.data.id });;
//         if (!Category) return res.status(404).json({ message: "Category not found" });
//         res.status(200).json({message : "Category Deleted", Category: Category});

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

module.exports = router