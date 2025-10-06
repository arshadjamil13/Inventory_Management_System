const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/auth.middleware")
const {createproduct,getproducts,getproductbysku,getproductbycategory,productbyfilterwithname,updateproduct,deleteproduct} =require("../controller/product.controller")

router.post("/createproduct",authMiddleware,createproduct)
router.get("/getproducts",authMiddleware,getproducts)
router.get("/getproductbysku",authMiddleware,getproductbysku)
router.get("/getproductbycategory",authMiddleware,getproductbycategory)
router.get("/productbyfilterwithname",authMiddleware,productbyfilterwithname)
router.put("/updateproduct/:sku",authMiddleware,updateproduct)
router.delete("/deleteproduct/:sku",authMiddleware,deleteproduct)


module.exports = router