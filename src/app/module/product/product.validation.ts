import { z } from 'zod'

const insertProductZodSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .max(150, 'Name cannot be more than 150 characters long'),
  price: z.number().positive(),
  images: z.array(z.string()),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, 'Description must be 10 characters long')
    .max(450, 'Description cannot be more than 450 characters long'),
  category: z.string(),
  stock: z.number().positive(),
})
const updateProductZodSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .max(150, 'Name cannot be more than 150 characters long')
    .optional(),
  price: z.number().positive().optional(),
  images: z.array(z.string()).optional(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, 'Description must be 10 characters long')
    .max(450, 'Description cannot be more than 450 characters long')
    .optional(),
  category: z.string().optional(),
  stock: z.number().optional(),
})

export const productZodValidation = {
  insertProductZodSchema,
  updateProductZodSchema,
}
