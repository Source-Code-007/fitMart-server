import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/appError'
import { orderService } from './order.service'

const insertOrder = catchAsync(async (req, res) => {
  const order = await orderService.insertOrder(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Order inserted successfully!',
    data: order,
  })
})

const getAllOrder = catchAsync(async (req, res) => {
  const {orders, meta} = await orderService.getAllOrder(req.query)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Orders are retrieved successfully!',
    data: orders,
    meta
  })
})

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id)
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Order is retrieved successfully!',
    data: order,
  })
})


export const orderController = {
  insertOrder,
  getAllOrder,
  getOrderById
}
