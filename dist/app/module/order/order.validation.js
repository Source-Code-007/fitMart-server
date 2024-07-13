"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodValidation = void 0;
const zod_1 = require("zod");
const insertOrderSchema = zod_1.z.object({
    customerName: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string(),
    products: zod_1.z.array(zod_1.z.object({ product: zod_1.z.string(), quantity: zod_1.z.number() })),
    paymentMethod: zod_1.z.enum(['Cash on Delivery (COD)', 'STRIPE'], {
        message: 'Invalid payment method.',
    }),
    shippingAddress: zod_1.z.object({
        details: zod_1.z.string(),
        postalCode: zod_1.z.string(),
        city: zod_1.z.string(),
        district: zod_1.z.string(),
        division: zod_1.z.string(),
    }),
});
exports.orderZodValidation = {
    insertOrderSchema,
};
