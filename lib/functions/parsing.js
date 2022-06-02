"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseColor = void 0;
const ColorNames_1 = require("../constants/ColorNames");
const Matchers_1 = require("../constants/Matchers");
const conversion_1 = require("./conversion");
let trimLeft = /^\s+/, trimRight = /\s+$/;
// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
const parseColor = (color) => {
    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
    if (ColorNames_1.SUPER_COLOR_NAMES[color]) {
        color = ColorNames_1.SUPER_COLOR_NAMES[color];
    }
    else if (color === 'transparent') {
        color = '#0000';
    }
    let match;
    if ((match = Matchers_1.MATCHERS.rgb.exec(color))) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = 1;
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(r, g, b);
        const format = 'rgb';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.rgba.exec(color))) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = parseFloat(match[4]);
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(r, g, b);
        const format = 'rgb';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hsl.exec(color))) {
        const h = parseFloat(match[1]);
        const sLightness = parseFloat(match[2]);
        const l = parseFloat(match[3]);
        const a = 1;
        const { r, g, b, sValue, v } = (0, conversion_1.hslToRgbsv)(h, sLightness, l);
        const format = 'hsl';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hsla.exec(color))) {
        const h = parseFloat(match[1]);
        const sLightness = parseFloat(match[2]);
        const l = parseFloat(match[3]);
        const a = parseFloat(match[4]);
        const { r, g, b, sValue, v } = (0, conversion_1.hslToRgbsv)(h, sLightness, l);
        const format = 'hsl';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hsv.exec(color))) {
        const h = parseFloat(match[1]);
        const sValue = parseFloat(match[2]);
        const v = parseFloat(match[3]);
        const a = 1;
        const { r, g, b, sLightness, l } = (0, conversion_1.hsvToRgbsl)(h, sValue, v);
        const format = 'hsv';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hsva.exec(color))) {
        const h = parseFloat(match[1]);
        const sValue = parseFloat(match[2]);
        const v = parseFloat(match[3]);
        const a = parseFloat(match[4]);
        const { r, g, b, sLightness, l } = (0, conversion_1.hsvToRgbsl)(h, sValue, v);
        const format = 'hsv';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hex8.exec(color))) {
        const r = parseInt(match[1], 16);
        const g = parseInt(match[2], 16);
        const b = parseInt(match[3], 16);
        const a = parseInt(match[4], 16) / 255;
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hex6.exec(color))) {
        const r = parseInt(match[1], 16);
        const g = parseInt(match[2], 16);
        const b = parseInt(match[3], 16);
        const a = 1;
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hex4.exec(color))) {
        const r = parseInt(match[1] + '' + match[1], 16);
        const g = parseInt(match[2] + '' + match[2], 16);
        const b = parseInt(match[3] + '' + match[3], 16);
        const a = parseInt(match[4] + '' + match[4], 16) / 255;
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = Matchers_1.MATCHERS.hex3.exec(color))) {
        const r = parseInt(match[1] + '' + match[1], 16);
        const g = parseInt(match[2] + '' + match[2], 16);
        const b = parseInt(match[3] + '' + match[3], 16);
        const a = 1;
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    return false;
};
exports.parseColor = parseColor;
