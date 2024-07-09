import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
})


const  Product = model<TProduct>('Product', ProductSchema)

export default Product


