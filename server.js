require("dotenv").config();
const express = require ("express")
const cors = require("cors")
const connectDB = require("./config/db");
const authRouter = require("./src/routes/auth.route")
const productRouter = require("./src/routes/product.route")
const categoryRouter = require("./src/routes/category.route")
const stockRouter = require("./src/routes/stock.route")
const orderRouter = require("./src/routes/order.route")

const app= express()
// app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json())

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/stock", stockRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server Running on port 3000")
})