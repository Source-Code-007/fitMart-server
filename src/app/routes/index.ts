import { Router } from 'express'
import { productRouter } from '../module/product/product.route'
import { categoryRouter } from '../module/category/category.route'


const router = Router()
const routes = [
  {
    path: '/product',
    route: productRouter,
  },
  {
    path: '/category',
    route: categoryRouter,
  }
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
