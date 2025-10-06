const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/auth.middleware")
const {createcategory,getcategory,updatecategory,deletecategory} = require("../controller/category.controller")


router.post("/createcategory",authMiddleware,createcategory)
router.get("/getcategory",authMiddleware,getcategory)
router.put("/updatecategory/:id" ,authMiddleware,updatecategory)
router.delete("/deletecategory/:id",authMiddleware,deletecategory)



module.exports = router