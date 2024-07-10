"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
exports.productRouter = router;
router.post('/', (0, zodValidateHandler_1.default)(product_validation_1.productZodValidation.insertProductZodSchema), product_controller_1.productController.insertProduct);
router.get('/', product_controller_1.productController.getAllProduct);
router.get('/:id', product_controller_1.productController.getProductById);
router.delete('/:id', product_controller_1.productController.deleteProductById);
router.patch('/:id', product_controller_1.productController.updateProductById);
