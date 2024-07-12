import { z } from 'zod'

const insertCategorySchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .max(150, 'Name cannot be more than 150 characters long'),
  icon: z.string({ required_error: 'Image is required' }),
  description: z
    .string({ required_error: 'Description is required' })
    .max(450, 'Description cannot be more than 450 characters long'),
})
const updateCategorySchema = z.object({
  name: z
    .string()
    .max(150, 'Name cannot be more than 150 characters long')
    .optional(),
  icon: z.string().optional(),
  description: z
    .string()
    .max(450, 'Description cannot be more than 450 characters long')
    .optional(),
})

export const categoryZodValidation = {
  insertCategorySchema,
  updateCategorySchema,
}
