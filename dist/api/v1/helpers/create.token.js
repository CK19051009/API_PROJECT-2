"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const createToken = (number) => {
    let charter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678910";
    let result = "";
    for (let i = 0; i < number; i++) {
        result += charter.charAt(Math.floor(Math.random() * charter.length));
    }
    return result;
};
exports.createToken = createToken;
