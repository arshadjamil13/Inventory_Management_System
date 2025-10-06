const {z} = require("zod")
const checksignup = z.object({
    name : z.string(),
    email : z.string(),
    password : z.string(),
    role : z.enum(['staff', 'admin']).optional()
})

const checksignin = z.object({
    email :z.string(),
    password: z.string()
})
 
module.exports = {checksignup ,checksignin}