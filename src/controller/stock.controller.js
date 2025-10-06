const {Stock} = require("../models/stockTransaction.model")
const{Product} =require("../models/product.model")
const {checkStockType,checkproductId,checkProductDate} = require("../typecheck/stock.typecheck")


async function increaseproduct(req,res){
    try{
        const UserRole = req.user_role
        if(UserRole !== "admin"){
           return res.status(401).json({message : "Not Authorized"})
        }

        const {id} = req.params
        const body = req.body
        if(!id || !body){
            return res.status(400).json({message : "Please give the required Input"})
        }

        const parsedid = checkproductId.safeParse({id : id.trim()})
         if(!parsedid.success){
           return res.status(401).json({
            message:"Incorrect sku"
        })
        }
        
        const product = await Product.findOne({_id : parsedid.data.id});
        if (!product) return res.status(404).json({ message: "Product not found" });

        
        const parsedBody = checkStockType.safeParse(body)
        if(!parsedBody.success){
           return res.status(400).json({
            message:"Incorrect Input"
        })
        }

        
        const quantity = parsedBody.data.quantity
        const reason = parsedBody.data.reason
        const performedBy = req.user_id
        const type = "IN"

        

        product.stock_quantity += quantity;
        await product.save();

        const stock = new Stock({
            productId : parsedid.data.id,
            type : type ,
            quantity : quantity ,
            reason : reason,
            performedBy : performedBy
        })
        await stock.save();

        res.status(200).json({
            message : "Stock Increased",
            Product : product,
            Stock : stock
        })

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


async function decreaseproduct(req,res){
    try{
        const UserRole = req.user_role
        if(UserRole !== "admin"){
           return res.status(401).json({message : "Not Authorized"})
        }

        const {id} = req.params
        const body = req.body

        if(!id || !body){
            return res.status(400).json({message : "Please Give the required Input"})
        }

        const parsedid = checkproductId.safeParse({id : id.trim()})
        if(!parsedid.success){
           return res.status(401).json({
            message:"Incorrect sku"
        })
        }
        
        const product = await Product.findOne({_id : parsedid.data.id});
        if (!product) return res.status(404).json({ message: "Product not found" });

        
        const parsedBody = checkStockType.safeParse(body)
        if(!parsedBody.success){
           return res.status(400).json({
            message:"Incorrect Input"
        })
        }

        const quantity = parsedBody.data.quantity
        const reason = parsedBody.data.reason
        const performedBy = req.user_id
        const type = "OUT"

        

        product.stock_quantity -= quantity;
        await product.save();

        const stock = new Stock({
            productId : parsedid.data.id,
            type : type ,
            quantity : quantity ,
            reason : reason,
            performedBy : performedBy
        })
        await stock.save();

        res.status(200).json({
            message : "Stock Decreased",
            Product : product,
            Stock : stock
        })

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


async function getstockhistory(req,res){
     try{

        const pageNumber = parseInt(req.query.page) || 1;
        const limitNumber = Math.min(parseInt(req.query.limit) || 10, 100); // cap at 100
        const skip = (pageNumber - 1) * limitNumber;

        const history = await Stock.find()
          .populate("productId", "name sku category_id price")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber)

        if(history.length == 0){
            return res.status(400).json({message: " No Stocks Found"})
        }

        res.status(200).json({History : history});
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


async function getstocksummary(req,res){
    try{
        const pageNumber = parseInt(req.query.page) || 1;
        const limitNumber = Math.min(parseInt(req.query.limit) || 10, 100); // cap at 100
        const skip = (pageNumber - 1) * limitNumber;

        const products = await Product.find().select("name sku price stock_quantity").populate("category_id","name").sort({createdAt : -1}).skip(skip).limit(limitNumber);
       
        if(products.length == 0){
            return res.status(400).json({message: "No Stocks Found"})
        }

        res.status(200).json({Products : products});
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


async function getstockhistorybydate(req,res){
    try{
        const { start, end  } = req.query;
        if (!start || !end) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Start and end dates are required.",
            });
        }

        const parsedStart = checkProductDate.safeParse({date : start})
        const parsedEnd = checkProductDate.safeParse({date : end})
        if(!parsedEnd.success || !parsedStart.success){
            return res.status(400).json({
            message:"Incorrect Input"
        })
        }
        

        const startDate = parsedStart.data.date
        const endDate = parsedEnd.data.date

        startDate.setUTCHours(0,0,0,0)
        endDate.setUTCHours(23,59,59,999)


        if(startDate>endDate){
            return res.status(400).json({
                message:"Start Date cannot be greater than End Date"
            })
        }

        
        const pageNumber = parseInt(req.query.page) || 1;
        const limitNumber = Math.min(parseInt(req.query.limit) || 10, 100); // cap at 100
        const skip = (pageNumber - 1) * limitNumber;

        const history = await Stock.find({
          createdAt: { $gte: startDate, $lte: endDate },
        })
          .populate("productId", "name sku category")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber);

        if(history.length == 0){
            return res.status(200).json({message : "No Data Found"})
        }  
          
        res.json({ success: true, History: history });  
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports= {increaseproduct,decreaseproduct,getstockhistory,getstocksummary,getstockhistorybydate}