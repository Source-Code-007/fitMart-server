import QueryBuilder from '../../builder/QueryBuilder'
import { categorySearchableFields } from './category.constant'
import { TCategory } from './category.interface'
import Category from './category.model'

const insertCategory = async (category: TCategory) => {
  const res = await Category.create(category)
  return res
}

const getAllCategory = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .searchQuery(categorySearchableFields)
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()

  const result = await categoryQuery.queryModel

  return result
}

const updateCategoryById = async (id: string, category: Partial<TCategory>) => {
  const res = await Category.findByIdAndUpdate(id, category, { new: true })

  return res
}

const getCategoryById = async (id: string) => {
  const category = await Category.findById(id)

  return category
}
const deleteCategoryById = async (id: string) => {
  const category = await Category.findByIdAndDelete(id)

  return category
}

export const categoryService = {
  insertCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
}
