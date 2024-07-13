import { Types } from 'mongoose'

type TOrder = {
  customerName: string
  email: string
  phone: string
  products: { product: Types.ObjectId; quantity: number }[]
  orderStatus: 'pending' | 'confirmed' | 'shipping' | 'shipped' | 'delivered'
  paymentStatus: 'paid' | 'unpaid'
  shippingAddress: {
    details: string
    postalCode: string
    city: string
    district: string
    division: string
  }
  paymentMethod: 'Cash on Delivery (COD)' | 'STRIPE'
  total: number
}

export { TOrder }
