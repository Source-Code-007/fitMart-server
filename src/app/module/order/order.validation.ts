import { z } from 'zod'

const insertOrderSchema = z.object({
  products: z.array(z.object({ productId: z.string(), quantity: z.number() })),
  paymentStatus: z.enum([
    'pending',
    'confirmed',
    'shipping',
    'shipped',
    'delivered',
  ]),
  orderStatus: z.enum(['paid', 'unpaid']),
})

export const orderZodValidation = {
  insertOrderSchema,
}
