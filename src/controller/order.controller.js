const {Order} = require("../models/order.model")
const {checkcreateorder,checkallorder,checkorderid,checkorderstatus} = require("../typecheck/order.typecheck")
const {Product} =require("../models/product.model")

async function createorder(req,res){
    try{
        const UserRole = req.user_role
        if(UserRole !== "admin"){
          return  res.status(401).json({message : "Not Authorized"})
        }

        const { customer, items, paymentMethod } = req.body;
        if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in order" });
        }

        const parsedBody = checkcreateorder.safeParse({customer,items,paymentMethod});
        if(!parsedBody.success){
            return res.status(400).json({message : "Check the data and try again"})
        }

        for (const item of items){
            
         const product = await Product.findById(item.productId);
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }

          if (product.stock_quantity < item.quantity) {
            return res.status(400).json({ message: `Not enough stock for ${product.name}`});
              
          }
        }

        let totalAmount = 0;
        const populatedItems = [];
        
       

        for (const item of items){
            
         const product = await Product.findById(item.productId);
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }

       
          const subtotal = product.price * item.quantity;
          totalAmount += subtotal;
          
          populatedItems.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
            subtotal,
          });
          
          // Deduct stock
          product.stock_quantity -= item.quantity;
          await product.save();

        }


        const order = new Order({
          customer,
          items: populatedItems,
          totalAmount,
          paymentMethod,
          paymentStatus: "pending",
          orderStatus: "pending",
          createdBy: req.user_id,
        });

        await order.save();
        res.status(200).json({message : "Successfully Order Created",Order : order})
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getallorder(req,res){
    try{
        const { status, from, to } = req.query;
        const parsedQueries = checkallorder.safeParse({status,from,to})
        if(!parsedQueries.success){
            return res.status(400).json({message : "Check the data and try again"})
        }


        let { status: parsedStatus, from: parsedFrom, to: parsedTo } = parsedQueries.data;
        if (parsedFrom && parsedTo) {
          parsedFrom.setUTCHours(0, 0, 0, 0);
          parsedTo.setUTCHours(23, 59, 59, 999);
        }
      


        if(parsedFrom >parsedTo){
            return res.status(400).json({
                message:"Start Date cannot be greater than End Date"
            })
        }

        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const skip = (page - 1) * limit;

        let filter = {};
        if (parsedStatus) filter.orderStatus = parsedStatus;
        if (parsedFrom  && parsedTo) {
        filter.createdAt = { $gte: new Date(parsedFrom), $lte: new Date(parsedTo) };
        }

        const orders = await Order.find(filter)
        .populate("items.productId", "name sku category_id")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        if(!orders || orders.length ==0){
            return res.status(404).json({message : "Orders Not Found"})
        }

        res.json({ success: true, Orders : orders });

    }catch(error){
        console.error("Error in getallorder:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getorderbyid(req,res){
    try{
        const {id} = req.params
        const parsedid = checkorderid.safeParse({id})
        if(!parsedid.success){
            return res.status(400).json({message : "Give the required Input"})
        }

        const order = await Order.findById(parsedid.data.id).populate(
          "items.productId",
          "name sku category"
        );

        if (!order || order.length==0) return res.status(404).json({ message: "Order not found" });

        res.json({ success: true,Order : order });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

async function updateorder(req,res){
    try{
        const UserRole = req.user_role
        if(UserRole !== "admin"){
          return  res.status(401).json({message : "Not Authorized"})
        }

        const { orderStatus, paymentStatus } = req.body;
        const{id} = req.params
        const parsedid = checkorderid.safeParse({id})
        if(!parsedid.success){
            return res.status(400).json({message : "Give the required Input for Id"})
        }

        const order = await Order.findById(parsedid.data.id);
        if (!order) return res.status(404).json({ message: "Order not found" });


        const parsedBody = checkorderstatus.safeParse({orderStatus,paymentStatus})
         if(!parsedBody.success){
            return res.status(400).json({message : "Give the required Input for Body"})
        }

        if (parsedBody.data.orderStatus) order.orderStatus = parsedBody.data.orderStatus;
        if (parsedBody.data.paymentStatus) order.paymentStatus = parsedBody.data.paymentStatus;

        await order.save();
        res.json({ success: true, Order : order });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

async function deleteorder(req,res){
    try{
        const UserRole = req.user_role
        if(UserRole !== "admin"){
          return  res.status(401).json({message : "Not Authorized"})
        }

        const{id} = req.params
        const parsedid = checkorderid.safeParse({id})
        if(!parsedid.success){
            return res.status(400).json({message : "Give the required Input for Id"})
        }


        const order = await Order.findById(parsedid.data.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.orderStatus = "cancelled";
        await order.save();

        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock_quantity : item.quantity },
          });
        }

        res.json({ success: true, message: "Order cancelled" });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

async function ordersummary(req,res){
    try{
        const { from, to } = req.query;
        const parsedQueries = checkallorder.safeParse({from,to})
        if(!parsedQueries.success){
            return res.status(400).json({message : "Check the data and try again"})
        }

        let Parsedfrom = parsedQueries.data.from
        let parsedto = parsedQueries.data.to

        Parsedfrom.setUTCHours(0,0,0,0)
        parsedto.setUTCHours(23,59,59,999)


        if(Parsedfrom>parsedto){
            return res.status(400).json({
                message:"Start Date cannot be greater than End Date"
            })
        }

        let filter = {};
        if (Parsedfrom && parsedto) {
        filter.createdAt = { $gte: new Date(Parsedfrom), $lte: new Date(parsedto) };
        }

        const summary = await Order.aggregate([
          { $match: filter },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalAmount" },
              orderCount: { $sum: 1 },
            },
          },
        ]);

        if(!summary || summary.length == 0) return res.status(404).json({message : "No Data found"})
        res.json({ success: true, summary: summary[0] || {} });   

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {createorder,getallorder,getorderbyid,updateorder,deleteorder,ordersummary}