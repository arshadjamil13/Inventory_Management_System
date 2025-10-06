const express = require("express");
const router = express.Router();
// const {Product} = require("../models/product.model")
// const {category} = require("../models/category.model")
// const {checkCreateProduct,checkProductsku,updateProduct,checkCategoryId} = require("../typecheck/product.typecheck")
const {authMiddleware} = require("../middleware/auth.middleware")
const {createproduct,getproducts,getproductbysku,getproductbycategory,productbyfilterwithname,updateproduct,deleteproduct} =require("../controller/product.controller")

router.post("/createproduct",authMiddleware,createproduct)
router.get("/getproducts",authMiddleware,getproducts)
router.get("/getproductbysku",authMiddleware,getproductbysku)
router.get("/getproductbycategory",authMiddleware,getproductbycategory)
router.get("/productbyfilterwithname",authMiddleware,productbyfilterwithname)
router.put("/updateproduct/:sku",authMiddleware,updateproduct)
router.delete("/deleteproduct/:sku",authMiddleware,deleteproduct)
// router.post("/createproduct",authMiddleware,async(req,res)=>{
//     try{
        
//         const UserRole = req.user_role
//         if(UserRole !== "admin"){
//            return res.status(401).json({message : "Not Authorized"})
//         }


//         const body = req.body
//         if(!body){
//             return res.status(400).json({message : "Please give Body"})
//         }

//         const parsedBody = checkCreateProduct.safeParse(body)
//         if(!parsedBody.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//         }

//         const {name,sku,category_id,price,stock_quantity} = parsedBody.data;
        
//         const existing = await Product.findOne({ sku : sku });
//         if (existing) {
//           return res.status(400).json({ message: "Product already exists" });
//         }

//         const product = new Product({name, sku, category_id, price, stock_quantity });
//         await product.save();

//         res.status(201).json({ message: "Product created successfully", product });

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })


// router.get("/getproducts",authMiddleware,async(req,res)=>{
//     try{
//         const pageNumber = parseInt(req.query.page) || 1;
//         const limitNumber = Math.min(parseInt(req.query.limit) || 10, 100); // cap at 100
//         const skip = (pageNumber - 1) * limitNumber;

//         const products = await Product.find().sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limitNumber);

//         if(products.length == 0){
//         return res.status(400).json({message : "No Categories Found"})
//         }

//         res.status(200).json({Products : products});

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

// router.get("/getproductbysku",authMiddleware,async(req,res)=>{
//     try{
//         const {sku} = req.query
//         if(!sku){
//             return res.status(400).json({message : "Product SKU is required"})
//         }

//         const parsedsku = checkProductsku.safeParse({sku : sku.trim()}) 
        
//         if(!parsedsku.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//         }

//         const product = await Product.findOne({sku : parsedsku.data.sku});
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         res.status(200).json({Products: product});

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

// router.get("/getproductbycategory",authMiddleware,async(req,res)=>{
//     try{
//         const {categoryId} = req.query
//         if(!categoryId){
//             return res.status(400).json({message : "CategoryId is required"})
//         }

//         const parsedCategoryId = checkCategoryId.safeParse({category_id : categoryId.trim()}) 
        
//         if(!parsedCategoryId.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//         }

//         const pageNumber = parseInt(req.query.page) || 1;
//         const limitNumber = Math.min(parseInt(req.query.limit) || 10, 100); // cap at 100
//         const skip = (pageNumber - 1) * limitNumber;

//         const product = await Product.find({category_id : parsedCategoryId.data.category_id}).populate("category_id", "name description").sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limitNumber);

//         if (!product) return res.status(404).json({ message: "Product not found" });
//         if(product.length == 0){
//         return res.status(400).json({message : "No Categories Found"})
//         }

//         res.status(200).json({Products: product});

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

// router.get("/productbyfilterwithname",authMiddleware,async (req,res)=>{
//     try{
//         const filter = req.query.filter || ""
      
//         const products = await Product.find({
//             $or : [{
//                 name : {
//                     "$regex" : filter,
//                     "$options" : "i"
//                 }
//             }]
//         })
        

//         if(!products || products.length == 0 ){
//             return res.status(400).json({
//                 message : "No Products Found"
//             })
//         }
        
//         res.status(200).json({
//             Products : products.map(product =>({
//                 product
//             }))
//         })

//     }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

// router.put("/updateproduct/:sku",authMiddleware,async(req,res)=>{
//      try{
//         const UserRole = req.user_role
//         if(UserRole !== "admin"){
//             return res.status(401).json({message : "Not Authorized"})
//         }

//         const {sku} = req.params
//         const body = req.body
//          if(!sku || !body){
//             return res.status(400).json({message : "Please Give the required Input"})
//         }

//         const parsedsku = checkProductsku.safeParse({sku : sku.trim()})
//          if(!parsedsku.success){
//            return res.status(401).json({
//             message:"Incorrect sku"
//         })
//         }

        
//         const parsedBody = updateProduct.safeParse(body)
//          if(!parsedBody.success){
//            return res.status(400).json({
//             message:"Incorrect Inputs"
//         })
//         }

//         const updatedProduct = await Product.findOneAndUpdate(
//           { sku: parsedsku.data.sku }, 
//           parsedBody.data, 
//           { new: true , runValidators: true } 
//         );
//         if (!updatedProduct) return res.status(404).json({ message: "Product not found" });


//         res.status(200).json({ message: "Product updated", updatedProduct });

//      }catch(error){
//         res.status(500).json({ success: false, message: error.message });
//      }
// })

// router.delete("/deleteproduct/:sku",authMiddleware,async(req,res)=>{
//     try{
//         const UserRole = req.user_role
//         if(UserRole !== "admin"){
//            return res.status(401).json({message : "Not Authorized"})
//         }

//         const {sku} = req.params
//          if(!sku){
//             return res.status(400).json({message : "Product SKU is required"})
//         }

//         const parsedsku = checkProductsku.safeParse({sku : sku.trim()}) 
//          if(!parsedsku.success){
//            return res.status(400).json({
//             message:"Incorrect Input"
//         })
//         }

//         const product = await Product.findOneAndDelete({ sku: parsedsku.data.sku });;
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         res.status(200).json({message : "Product Deleted", Product: product});

//     }catch{
//         res.status(500).json({ success: false, message: error.message });
//     }
// })

module.exports = router