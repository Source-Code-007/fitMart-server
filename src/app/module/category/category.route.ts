import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { categoryZodValidation } from './category.validation'
import { categoryController } from './category.controller'

const router = Router()

router.post(
  '/',
  zodValidateHandler(categoryZodValidation.insertCategorySchema),
  categoryController.insertCategory,
)
router.get('/', categoryController.getAllCategory)
router.get('/:id', categoryController.getCategoryById)
router.patch(
  '/:id',
  zodValidateHandler(categoryZodValidation.updateCategorySchema),
  categoryController.updateCategoryById,
)
router.delete('/:id', categoryController.deleteCategoryById)

export { router as categoryRouter }
