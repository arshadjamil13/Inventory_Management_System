const z= require("zod")
const checkCreateProduct = z.object({
   
    name : z.string(),
    sku : z.string(),
    category_id :z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    price : z.number(),
    stock_quantity : z.number()
})


const checkProductsku = z.object({
  sku: z.string()
});

const checkCategoryId = z.object({
  category_id : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional() 
})
const updateProduct = z.object({
    name : z.string().optional(),
    category_id : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional(),
    price : z.number().optional(),
    stock_quantity : z.number().optional()
})


module.exports = {checkCreateProduct,checkProductsku ,updateProduct,checkCategoryId}