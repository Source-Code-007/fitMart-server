"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
exports.orderRouter = router;
router.post('/', (0, zodValidateHandler_1.default)(order_validation_1.orderZodValidation.insertOrderSchema), order_controller_1.orderController.insertOrder);
router.get('/', order_controller_1.orderController.getAllOrder);
router.get('/:id', order_controller_1.orderController.getOrderById);
