import { Schema } from 'mongoose'

type TProduct = {
  name: string
  price: number
  description: string
  images: object
  category: Schema.Types.ObjectId
  stock: number
}

export { TProduct }
