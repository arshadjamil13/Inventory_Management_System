const z= require("zod")

const checkStockType = z.object({
    // productSku : z.string(),
    quantity : z.number(),
    reason : z.string().optional()
})

const checkproductId =z.object({
    id : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
})

const checkProductDate = z.object({
    date : z.preprocess((val) => {
    if (typeof val === "string") {
      const date = new Date(val);
      if (!isNaN(date.getTime())) return date;
    }
    return undefined;
  }, z.date())
})

module.exports = {checkStockType,checkproductId,checkProductDate}