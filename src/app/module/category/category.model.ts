import { model, Schema } from 'mongoose'
import { TCategory } from './category.interface'

const CategorySchema = new Schema<TCategory>({
  name: { type: String, required: true },
  description: {type: String, required: true},
  icon: { type: String, required: true },
})

const Category = model<TCategory>('Category', CategorySchema)

export default Category
