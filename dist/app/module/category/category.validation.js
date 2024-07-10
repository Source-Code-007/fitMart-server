"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryZodValidation = void 0;
const zod_1 = require("zod");
const insertCategorySchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }).max(150, 'Name cannot be more than 150 characters long'),
    icon: zod_1.z.string({ required_error: 'Image is required' }),
    description: zod_1.z.string({ required_error: 'Description is required' }).max(250, 'Description cannot be more than 250 characters long'),
});
const updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().max(150, 'Name cannot be more than 150 characters long').optional(),
    icon: zod_1.z.string().optional(),
    description: zod_1.z.string().max(250, 'Description cannot be more than 250 characters long').optional(),
});
exports.categoryZodValidation = { insertCategorySchema, updateCategorySchema };
