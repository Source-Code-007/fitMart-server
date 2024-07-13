import QueryBuilder from '../../builder/QueryBuilder'
import Order from './order.model'
import { TOrder } from './order.interface'
import { orderSearchableFields } from './order.constant'
import mongoose from 'mongoose'
import Product from '../product/product.model'
import AppError from '../../errors/appError'
import { StatusCodes } from 'http-status-codes'

const insertOrder = async (order: TOrder) => {
  const { products } = order
  let total = 0

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    for (const product of products) {
      const existProduct = await Product.findById(product.product)

      if (!existProduct) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Product not found')
      }

      if (existProduct.stock < product.quantity) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `Product out of stock: ${existProduct.name}`,
        )
      }

      total += existProduct.price * product.quantity

      existProduct.stock -= product.quantity
      await existProduct.save({ session })
    }

    const res = await Order.create([{ ...order, total }], { session })
    if (!res?.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to insert order!')
    }

    await session.commitTransaction()
    return res[0]
  } catch (e: any) {
    session.abortTransaction()
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, e.message)
  } finally {
    session.endSession()
  }
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
        path: 'products.product',
      },
    ])

  const orders = await orderQuery.queryModel
  const total = await Order.countDocuments({})
  const { page, limit } = query

  return {
    orders,
    meta: {
      total,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    },
  }
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
