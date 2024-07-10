import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { categoryService } from './category.service'
import AppError from '../../errors/appError'

const insertCategory = catchAsync(async (req, res) => {
  const category = await categoryService.insertCategory(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Category inserted successfully!',
    data: category,
  })
})

const getAllCategory = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategory(req.query)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Categories are retrieved successfully!',
    data: categories,
  })
})

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id)
  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Category is retrieved successfully!',
    data: category,
  })
})

const updateCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(
    req.params.id,
    req.body,
  )
  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Category is updated successfully!',
    data: category,
  })
})

const deleteCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategoryById(
    req.params.id,
  )
  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Category is deleted successfully!',
    data: category,
  })
})

export const categoryController = {
  insertCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
}