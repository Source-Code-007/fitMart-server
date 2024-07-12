import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { productService } from './product.service'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/appError'

const insertProduct = catchAsync(async (req, res) => {
  const product = await productService.insertProduct(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Product inserted successfully!',
    data: product,
  })
})

const getAllProduct = catchAsync(async (req, res) => {
  const {products, meta} = await productService.getAllProduct(req.query)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Products are retrieved successfully!',
    data: products,
    meta
  })
})

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id)
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Product is retrieved successfully!',
    data: product,
  })
})

const updateProductById = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(
    req.params.id,
    req.body,
  )
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Product is updated successfully!',
    data: product,
  })
})

const deleteProductById = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req.params.id)
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Product is deleted successfully!',
    data: product,
  })
})

export const productController = {
  insertProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
}
