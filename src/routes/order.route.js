const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/auth.middleware")
const {createorder,getallorder,getorderbyid,updateorder,deleteorder,ordersummary} = require("../controller/order.controller")

router.post("/createorders",authMiddleware,createorder)
router.get("/getallorders",authMiddleware,getallorder)
router.get("/getorderbyid/:id",authMiddleware,getorderbyid)
router.put("/updateorder/:id",authMiddleware,updateorder)
router.delete("/deleteorder/:id",authMiddleware,deleteorder)
router.get("/ordersummary",authMiddleware,ordersummary)

module.exports = router