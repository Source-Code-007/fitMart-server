import { Router } from 'express'
import { productRouter } from '../module/product/product.route'
import { categoryRouter } from '../module/category/category.route'
import { orderRouter } from '../module/order/order.route'

const router = Router()
const routes = [
  {
    path: '/product',
    route: productRouter,
  },
  {
    path: '/category',
    route: categoryRouter,
  },
  {
    path: '/order',
    route: orderRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
