import QueryBuilder from '../../builder/QueryBuilder'
import { productSearchableFields } from './product.constant'
import { TProduct } from './product.interface'
import Product from './product.model'

const insertProduct = async (product: TProduct) => {
  const res = await Product.create(product)

  return res
}

const getAllProduct = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .searchQuery(productSearchableFields)
    .filterQuery(['category'])
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'category',
      },
    ])

  const products = await productQuery.queryModel

  const total = await Product.countDocuments(
    productQuery.queryModel.getFilter(),
  )
  const { page, limit } = query

  return {
    meta: {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      total,
    },
    products,
  }
}

const updateProductById = async (id: string, product: Partial<TProduct>) => {
  const res = await Product.findByIdAndUpdate(id, product, {
    new: true,
  })

  return res
}

const getProductById = async (id: string) => {
  const product = await Product.findById(id).populate('category')

  return product
}
const deleteProductById = async (id: string) => {
  const product = await Product.findByIdAndDelete(id)

  return product
}

export const productService = {
  insertProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
}
