import {z} from 'zod';

export const messageSchema = z.object({
    content : z.string()
    .min(10, {message : 'Content must be of at least 10 Characters'})
    .max(300, {message : 'Content must be no longer than 300 Characters'})

})