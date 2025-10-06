const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/auth.middleware")
const {signup,signin,profile} = require("../controller/auth.controller")

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/profile",authMiddleware,profile)


module.exports = router