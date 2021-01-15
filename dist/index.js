"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const main = () => {
    const app = express_1.default();
    let PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
};
main();
//# sourceMappingURL=index.js.map