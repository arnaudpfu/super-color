"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flip = exports.rd2 = exports.rd = void 0;
exports.rd = Math.round;
const rd2 = (n) => (0, exports.rd)(n * 100) / 100;
exports.rd2 = rd2;
// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
const flip = (o) => {
    let flipped = {};
    for (let i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
};
exports.flip = flip;
