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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server = app_1.default.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log(`😀 Database connected at port ${process.env.PORT}`);
    }
    catch (e) {
        console.log(`😡 Failed to connect with db - ${e.message}`);
    }
}));
// stop server when async errors
process.on("unhandledRejection", () => {
    console.log("😡 UNHANDLED REJECTION! Shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});
// stop server when sync errors
process.on("uncaughtException", () => {
    console.log("😡 UNCAUGHT EXCEPTION! Shutting down...");
    process.exit(1);
});
