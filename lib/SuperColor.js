"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperColor = void 0;
const HexNames_1 = require("./constants/HexNames");
const conversion_1 = require("./functions/conversion");
const parsing_1 = require("./functions/parsing");
const utils_1 = require("./functions/utils");
class SuperColor {
    constructor(color) {
        if (typeof color === 'string') {
            const parsed = (0, parsing_1.parseColor)(color);
            if (parsed) {
                this.r = parsed.r;
                this.g = parsed.g;
                this.b = parsed.b;
                this.h = parsed.h;
                this.sLightness = parsed.sLightness;
                this.l = parsed.l;
                this.sValue = parsed.sValue;
                this.v = parsed.v;
                this.a = parsed.a;
                this.format = parsed.format;
            }
            else {
                console.warn('Color parsing did not work.');
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.h = 0;
                this.sLightness = 0;
                this.l = 0;
                this.sValue = 0;
                this.v = 0;
                this.a = 1;
                this.format = 'hex';
            }
        }
        else {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.h = color.h;
            this.sLightness = color.sLightness;
            this.l = color.l;
            this.sValue = color.sValue;
            this.v = color.v;
            this.a = color.a;
            this.format = color.format;
        }
    }
    getFormat() {
        return this.format;
    }
    setFormat(format) {
        this.format = format;
    }
    setAlpha(alpha) {
        this.a = alpha;
    }
    setHue(hue) {
        // stable: sValue,sLightness,l,v
        const { r, g, b } = (0, conversion_1.hslToRgb)(hue, this.sLightness, this.l);
        this.r = r;
        this.g = g;
        this.b = b;
        this.h = hue;
    }
    setHex(color) {
        const { r, g, b, a } = (0, conversion_1.hexToRgba)(color);
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(r, g, b);
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.h = h;
        this.sLightness = sLightness;
        this.l = l;
        this.sValue = sValue;
        this.v = v;
    }
    setRgb(rgbValue) {
        // stable a
        const rgb = Object.assign({ r: this.r, g: this.g, b: this.b }, rgbValue);
        const { h, sLightness, l, sValue, v } = (0, conversion_1.rgbToHslsv)(rgb.r, rgb.g, rgb.b);
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.h = h;
        this.sLightness = sLightness;
        this.l = l;
        this.sValue = sValue;
        this.v = v;
    }
    setHsl(hslValue) {
        // stable a
        const hsl = Object.assign({ h: this.h, sLightness: this.sLightness, l: this.l }, hslValue);
        const { r, g, b, sValue, v } = (0, conversion_1.hslToRgbsv)(hsl.h, hsl.sLightness, hsl.l);
        this.h = hsl.h;
        this.sLightness = hsl.sLightness;
        this.l = hsl.l;
        this.sValue = sValue;
        this.v = v;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    setHsv(hsvValue) {
        //stable h,a,
        const hsv = Object.assign({ h: this.h, sValue: this.sValue, v: this.v }, hsvValue);
        const { r, g, b, sLightness, l } = (0, conversion_1.hsvToRgbsl)(hsv.h, hsv.sValue, hsv.v);
        this.sValue = hsv.sValue;
        this.v = hsv.v;
        this.r = r;
        this.g = g;
        this.b = b;
        this.sLightness = sLightness;
        this.l = l;
    }
    toHex() {
        let alpha = this.a !== 1 ? (0, utils_1.rd)(this.a * 255).toString(16) : 'ff';
        let red = (0, utils_1.rd)(this.r).toString(16);
        let green = (0, utils_1.rd)(this.g).toString(16);
        let blue = (0, utils_1.rd)(this.b).toString(16);
        alpha = alpha.length === 1 ? '0' + alpha : alpha;
        red = red.length === 1 ? '0' + red : red;
        blue = blue.length === 1 ? '0' + blue : blue;
        green = green.length === 1 ? '0' + green : green;
        if (alpha[0] === alpha[1] &&
            red[0] === red[1] &&
            blue[0] === blue[1] &&
            green[0] === green[1]) {
            alpha = alpha[0];
            red = red[0];
            blue = blue[0];
            green = green[0];
        }
        if (/^f*$/.test(alpha)) {
            alpha = '';
        }
        return `#${red}${green}${blue}${alpha}`;
    }
    toRgba() {
        return {
            r: (0, utils_1.rd)(this.r),
            g: (0, utils_1.rd)(this.g),
            b: (0, utils_1.rd)(this.b),
            a: (0, utils_1.rd2)(this.a),
        };
    }
    toRgbaString() {
        return this.a === 1
            ? `rgb(${(0, utils_1.rd)(this.r)}, ${(0, utils_1.rd)(this.g)}, ${(0, utils_1.rd)(this.b)})`
            : `rgba(${(0, utils_1.rd)(this.r)}, ${(0, utils_1.rd)(this.g)}, ${(0, utils_1.rd)(this.b)}, ${(0, utils_1.rd2)(this.a)})`;
    }
    toHsla() {
        return {
            h: (0, utils_1.rd)(this.h),
            sLightness: (0, utils_1.rd2)(this.sLightness),
            l: (0, utils_1.rd2)(this.l),
            a: (0, utils_1.rd2)(this.a),
        };
    }
    toHslaString() {
        return this.a === 1
            ? `hsl(${(0, utils_1.rd)(this.h)}deg, ${(0, utils_1.rd)(this.sLightness * 100)}%, ${(0, utils_1.rd)(this.l * 100)}%)`
            : `hsla(${(0, utils_1.rd)(this.h)}deg, ${(0, utils_1.rd)(this.sLightness * 100)}%, ${(0, utils_1.rd)(this.l * 100)}%, ${(0, utils_1.rd2)(this.a)})`;
    }
    toHsva() {
        return {
            h: (0, utils_1.rd)(this.h),
            sValue: (0, utils_1.rd2)(this.sValue),
            v: (0, utils_1.rd2)(this.v),
            a: (0, utils_1.rd2)(this.a),
        };
    }
    toHsvaString() {
        return this.a === 1
            ? `hsv(${(0, utils_1.rd)(this.h)}deg, ${(0, utils_1.rd)(this.sValue * 100)}%, ${(0, utils_1.rd)(this.v * 100)}%)`
            : `hsva(${(0, utils_1.rd)(this.h)}deg, ${(0, utils_1.rd)(this.sValue * 100)}%, ${(0, utils_1.rd)(this.v * 100)}%, ${(0, utils_1.rd2)(this.a)})`;
    }
    toString(canBeColorName = true) {
        let stringColor = this.toHex();
        if (canBeColorName && HexNames_1.SUPER_COLOR_HEX_NAMES[stringColor]) {
            return HexNames_1.SUPER_COLOR_HEX_NAMES[stringColor];
        }
        switch (this.format) {
            case 'rgb':
                stringColor = this.toRgbaString();
                break;
            case 'hsl':
                stringColor = this.toHslaString();
                break;
            case 'hsv':
                stringColor = this.toHsvaString();
                break;
        }
        return stringColor;
    }
}
exports.SuperColor = SuperColor;
