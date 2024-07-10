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
exports.categoryService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constant_1 = require("./category.constant");
const category_model_1 = __importDefault(require("./category.model"));
const insertCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield category_model_1.default.create(category);
    return res;
});
const getAllCategory = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.default.find(), query)
        .searchQuery(category_constant_1.categorySearchableFields)
        .filterQuery()
        .paginateQuery()
        .sortQuery()
        .fieldFilteringQuery();
    const result = yield categoryQuery.queryModel;
    return result;
});
const updateCategoryById = (id, category) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield category_model_1.default.findByIdAndUpdate(id, category, { new: true });
    return res;
});
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findById(id);
    return category;
});
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findByIdAndDelete(id);
    return category;
});
exports.categoryService = {
    insertCategory,
    getAllCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
