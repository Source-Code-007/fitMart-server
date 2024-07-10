import { z } from "zod";


const insertCategorySchema = z.object({
    name: z.string({ required_error: 'Name is required' }).max(150, 'Name cannot be more than 150 characters long'),
    icon: z.string({ required_error: 'Image is required' }),
    description: z.string({ required_error: 'Description is required' }).max(250, 'Description cannot be more than 250 characters long'),
})
const updateCategorySchema = z.object({
    name: z.string().max(150, 'Name cannot be more than 150 characters long').optional(),
    icon: z.string().optional(),
    description: z.string().max(250, 'Description cannot be more than 250 characters long').optional(),
})

export const categoryZodValidation = {insertCategorySchema, updateCategorySchema}