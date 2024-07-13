import { Types } from 'mongoose'

type TOrder = {
  products: { productId: Types.ObjectId; quantity: number }[]
  orderStatus: 'pending' | 'confirmed' | 'shipping' | 'shipped' | 'delivered'
  paymentStatus: 'paid' | 'unpaid'
}

export { TOrder }
