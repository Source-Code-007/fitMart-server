"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Product' },
    quantity: { type: Number, required: true },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    customerName: { type: String, required: true, default: 'Anonymous' },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    products: [productsSchema],
    total: { type: Number, default: 0 },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'shipping', 'shipped', 'delivered'],
        default: 'pending',
    },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    shippingAddress: {
        details: { type: String, required: true },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        division: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        enum: ['Cash on Delivery (COD)', 'STRIPE'],
        default: 'Cash on Delivery (COD)',
    },
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;