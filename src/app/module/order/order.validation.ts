import { z } from 'zod'

const insertOrderSchema = z.object({
  customerName: z.string(),
  phone: z.string(),
  email: z.string(),
  products: z.array(z.object({ product: z.string(), quantity: z.number() })),
  paymentMethod: z.enum(['Cash on Delivery (COD)', 'STRIPE'], {
    message: 'Invalid payment method.',
  }),
  shippingAddress: z.object({
    details: z.string(),
    postalCode: z.string(),
    city: z.string(),
    district: z.string(),
    division: z.string(),
  }),
})

export const orderZodValidation = {
  insertOrderSchema,
}
