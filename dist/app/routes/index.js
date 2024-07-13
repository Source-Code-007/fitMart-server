"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../module/product/product.route");
const category_route_1 = require("../module/category/category.route");
const order_route_1 = require("../module/order/order.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/product',
        route: product_route_1.productRouter,
    },
    {
        path: '/category',
        route: category_route_1.categoryRouter,
    },
    {
        path: '/order',
        route: order_route_1.orderRouter,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
