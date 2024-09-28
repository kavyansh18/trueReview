import {z} from 'zod'
 
export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters") 
    .min(20 , "Username must be withi 20 characters")
    .regex(/^\w+$/ ,"Username must not contain special character ")

export const signUpSchema = z.object ({
    usernameValidation: usernameValidation,
    email:z.string().email({message:"Invalid email "}),
    password:z.string().min(6, "Password must be atleast 6 characters"),
})