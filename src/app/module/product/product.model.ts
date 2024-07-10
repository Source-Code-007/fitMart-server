import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: Array, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  stock: { type: Number, required: true },
})

const Product = model<TProduct>('Product', ProductSchema)

export default Product
