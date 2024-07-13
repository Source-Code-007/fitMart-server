"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const order_model_1 = __importDefault(require("./order.model"));
const order_constant_1 = require("./order.constant");
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../product/product.model"));
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const insertOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = order;
    let total = 0;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        for (const product of products) {
            const existProduct = yield product_model_1.default.findById(product.product);
            if (!existProduct) {
                throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
            }
            if (existProduct.stock < product.quantity) {
                throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Product out of stock: ${existProduct.name}`);
            }
            total += existProduct.price * product.quantity;
            existProduct.stock -= product.quantity;
            yield existProduct.save({ session });
        }
        const res = yield order_model_1.default.create([Object.assign(Object.assign({}, order), { total })], { session });
        if (!(res === null || res === void 0 ? void 0 : res.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert order!');
        }
        yield session.commitTransaction();
        return res[0];
    }
    catch (e) {
        session.abortTransaction();
        throw new appError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, e.message);
    }
    finally {
        session.endSession();
    }
});
const getAllOrder = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.default.find(), query)
        .searchQuery(order_constant_1.orderSearchableFields)
        .filterQuery()
        .paginateQuery()
        .sortQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'products.product',
        },
    ]);
    const orders = yield orderQuery.queryModel;
    const total = yield order_model_1.default.countDocuments({});
    const { page, limit } = query;
    return {
        orders,
        meta: {
            total,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        },
    };
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(id);
    return order;
});
exports.orderService = {
    insertOrder,
    getAllOrder,
    getOrderById,
};
