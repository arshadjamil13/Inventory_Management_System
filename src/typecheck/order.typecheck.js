const z= require("zod")

const checkcreateorder = z.object({
  customer: z.object({
    name: z.string().min(1, "Customer name is required"),
    email: z.string().email("Invalid email").optional(),
    phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number").optional()
  }),
  
  items: z.array(
    z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ).min(1, "At least one item is required"),

  paymentMethod: z.enum(['cash', 'card', 'upi', 'netbanking']),
});


const checkallorder = z.object({
    status : z.enum(["pending", "completed", "cancelled"]).optional(),
    from : z.preprocess((val) => {
        if (typeof val === "string") {
          const date = new Date(val);
          if (!isNaN(date.getTime())) return date;
        }
        return undefined;
      }, z.date()).optional(),
    to :z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          const date = new Date(val);
          if (!isNaN(date.getTime())) return date;
        }
        return undefined;
      }, z.date()).optional()

})


const checkorderid =z.object({
    id : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
})


const checkorderstatus = z.object({
    orderStatus :z.enum(["pending", "completed", "cancelled"]).optional() ,
    paymentStatus : z.enum(["pending", "paid", "failed", "refunded"]).optional(),
})


module.exports = {checkcreateorder,checkallorder,checkorderid,checkorderstatus}