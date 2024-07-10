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
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'category',
      },
    ])

  const result = await productQuery.queryModel

  return result
}

const updateProductById = async (id: string, product: Partial<TProduct>) => {
  const res = await Product.findByIdAndUpdate(id, product, { new: true })

  return res
}

const getProductById = async (id: string) => {
  const product = await Product.findById(id)

  return product
}
const deleteProductById = async (id: string) => {
  const product = await Product.findByIdAndDelete(id)

  return product
}

export const productService = { insertProduct, getAllProduct, getProductById, updateProductById, deleteProductById }
