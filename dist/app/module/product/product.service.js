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
exports.productService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
const product_model_1 = __importDefault(require("./product.model"));
const insertProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.default.create(product);
    return res;
});
const getAllProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.default.find(), query)
        .searchQuery(product_constant_1.productSearchableFields)
        .filterQuery(['category'])
        .paginateQuery()
        .sortQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'category',
        },
    ]);
    const products = yield productQuery.queryModel;
    const total = yield product_model_1.default.countDocuments(productQuery.queryModel.getFilter());
    const { page, limit } = query;
    return {
        products,
        meta: {
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
            total,
        },
    };
});
const updateProductById = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.default.findByIdAndUpdate(id, product, {
        new: true,
    });
    return res;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(id).populate('category');
    return product;
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findByIdAndDelete(id);
    return product;
});
exports.productService = {
    insertProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};
