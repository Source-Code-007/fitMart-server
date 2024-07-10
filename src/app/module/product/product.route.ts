import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { productZodValidation } from './product.validation'
import { productController } from './product.controller'

const router = Router()

router.post(
  '/',
  zodValidateHandler(productZodValidation.insertProductZodSchema),
  productController.insertProduct,
)
router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProductById)
router.delete('/:id', productController.deleteProductById)
router.patch('/:id', productController.updateProductById)

export { router as productRouter }
