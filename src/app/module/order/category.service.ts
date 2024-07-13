import QueryBuilder from '../../builder/QueryBuilder'
import Order from './order.model'
import { TOrder } from './order.interface'
import { orderSearchableFields } from './order.constant'

const insertOrder = async (order: TOrder) => {
  const res = await Order.create(order)
  return res
}

const getAllOrder = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .searchQuery(orderSearchableFields)
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'productId',
      },
    ])

  const result = await orderQuery.queryModel

  return result
}

const getOrderById = async (id: string) => {
  const order = await Order.findById(id)

  return order
}

export const orderService = {
  insertOrder,
  getAllOrder,
  getOrderById,
}
