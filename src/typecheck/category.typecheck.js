const z= require("zod")
const checkCategory = z.object({
    name : z.string(),
    description : z.string().optional()
})

const checkupdatecategory = z.object({
    name : z.string().optional(),
    description : z.string().optional()
})

const checkCategoryId = z.object({
    id : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
})



module.exports = { checkCategory,checkCategoryId,checkupdatecategory}