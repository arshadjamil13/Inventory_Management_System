const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/auth.middleware")
const{increaseproduct,decreaseproduct,getstockhistory,getstocksummary,getstockhistorybydate} =require("../controller/stock.controller")

router.post("/increaseproduct/:id",authMiddleware,increaseproduct)
router.post("/decreaseproduct/:id",authMiddleware,decreaseproduct)
router.get("/getstockhistory",authMiddleware,getstockhistory)
router.get("/getstocksummary",authMiddleware,getstocksummary)
router.get("/getstockhistorybydate",authMiddleware,getstockhistorybydate)


module.exports = router
