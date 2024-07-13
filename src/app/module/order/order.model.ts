import { model, Schema } from 'mongoose'
import { TOrder } from './order.interface'

const productsSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    quantity: { type: Number, required: true },
  },
  { _id: false },
)

const orderSchema = new Schema<TOrder>({
  products: productsSchema,
  orderStatus: { type: String, required: true, default: 'pending' },
  paymentStatus: { type: String, required: true, default: 'unpaid' },
})

const Order = model<TOrder>('Order', orderSchema)

export default Order
