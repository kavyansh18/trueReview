import {z} from 'zod'
 
export const messagesSchema   = z.object({
    acceptMessages:z
        .string()
        .min(10, {message:"content must be atleast 10 characters"})
        .max(300, {message:"content must be within 300 characters"})

    })