"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
exports.categoryRouter = router;
router.post('/', (0, zodValidateHandler_1.default)(category_validation_1.categoryZodValidation.insertCategorySchema), category_controller_1.categoryController.insertCategory);
router.get('/', category_controller_1.categoryController.getAllCategory);
router.get('/:id', category_controller_1.categoryController.getCategoryById);
router.patch('/:id', (0, zodValidateHandler_1.default)(category_validation_1.categoryZodValidation.updateCategorySchema), category_controller_1.categoryController.updateCategoryById);
router.delete('/:id', category_controller_1.categoryController.deleteCategoryById);
