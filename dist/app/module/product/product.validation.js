"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productZodValidation = void 0;
const zod_1 = require("zod");
const insertProductZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .max(150, 'Name cannot be more than 150 characters long'),
    price: zod_1.z.number().positive(),
    images: zod_1.z.array(zod_1.z.string()),
    description: zod_1.z
        .string({ required_error: 'Description is required' })
        .min(10, 'Description must be 10 characters long')
        .max(450, 'Description cannot be more than 450 characters long'),
    category: zod_1.z.string(),
    stock: zod_1.z.number().positive(),
});
const updateProductZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .max(150, 'Name cannot be more than 150 characters long')
        .optional(),
    price: zod_1.z.number().positive().optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z
        .string({ required_error: 'Description is required' })
        .min(10, 'Description must be 10 characters long')
        .max(450, 'Description cannot be more than 450 characters long')
        .optional(),
    category: zod_1.z.string().optional(),
    stock: zod_1.z.number().optional(),
});
exports.productZodValidation = {
    insertProductZodSchema,
    updateProductZodSchema,
};
