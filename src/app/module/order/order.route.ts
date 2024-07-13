import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { orderZodValidation } from './order.validation'
import { orderController } from './order.controller'

const router = Router()

router.post(
  '/',
  zodValidateHandler(orderZodValidation.insertOrderSchema),
  orderController.insertOrder,
)
router.get('/', orderController.getAllOrder)
router.get('/:id', orderController.getOrderById)

export { router as orderRouter }
