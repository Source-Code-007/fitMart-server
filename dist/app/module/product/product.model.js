"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Category' },
    stock: { type: Number, required: true },
});
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = Product;
