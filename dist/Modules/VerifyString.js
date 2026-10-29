"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const isEmpty = (value) => {
    if (typeof value === 'string') {
        if (value.trim() === '') {
            return true;
        }
        else if (Array.isArray(value) &&
            value.every((item) => typeof item === 'string')) {
            return true;
        }
    }
    return false;
};
exports.isEmpty = isEmpty;
//# sourceMappingURL=VerifyString.js.map