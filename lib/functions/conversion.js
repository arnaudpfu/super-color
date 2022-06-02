"use strict";
// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsvToRgbsl = exports.hslToRgbsv = exports.rgbToHslsv = exports.hexToRgba = exports.rgbToHsv = exports.hsvToRgb = exports.hslToRgb = exports.rgbToHsl = void 0;
// *Returns:* { h[0,360], s[0,1], l[0,1] }
const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    }
    else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h * 360, sLightness: s, l: l };
};
exports.rgbToHsl = rgbToHsl;
// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 360] and s and l are contained [0, 1]
// *Returns:* { r, g, b } in the set [0, 255]
const hslToRgb = (h, s, l) => {
    let r, g, b;
    h /= 360;
    function hue2rgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    if (s === 0) {
        r = g = b = l;
    }
    else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
};
exports.hslToRgb = hslToRgb;
// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
const hsvToRgb = (h, s, v) => {
    h *= 6 / 360;
    var i = Math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
};
exports.hsvToRgb = hsvToRgb;
// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
const rgbToHsv = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;
    let d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0;
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h * 360, sValue: s, v: v };
};
exports.rgbToHsv = rgbToHsv;
const hexToRgba = (hex) => {
    let c = hex.substring(1).split('');
    if (!/^#(([\dA-Fa-f]{3}){1,2}|([\dA-Fa-f]{4}){1,2})$/.test(hex)) {
        throw new Error('Your hexadecimal color is not correct.');
    }
    switch (c.length) {
        case 3:
            c = [c[0] + c[0], c[1] + c[1], c[2] + c[2], 'ff'];
            break;
        case 4:
            c = [c[0] + c[0], c[1] + c[1], c[2] + c[2], c[3] + c[3]];
            break;
        case 6:
            c = [c[0] + c[1], c[2] + c[3], c[4] + c[5], 'ff'];
            break;
        case 8:
            c = [c[0] + c[1], c[2] + c[3], c[4] + c[5], c[6] + c[7]];
            break;
    }
    const rgba = c.map((char) => parseInt(char, 16));
    rgba[3] = rgba[3] / 255;
    return {
        r: rgba[0],
        g: rgba[1],
        b: rgba[2],
        a: rgba[3],
    };
};
exports.hexToRgba = hexToRgba;
const rgbToHslsv = (r, g, b) => {
    const hsl = (0, exports.rgbToHsl)(r, g, b);
    const hsv = (0, exports.rgbToHsv)(r, g, b);
    return {
        h: hsl.h,
        sLightness: hsl.sLightness,
        l: hsl.l,
        sValue: hsv.sValue,
        v: hsv.v,
    };
};
exports.rgbToHslsv = rgbToHslsv;
const hslToRgbsv = (h, s, l) => {
    const { r, g, b } = (0, exports.hslToRgb)(h, s, l);
    const hsv = (0, exports.rgbToHsv)(r, g, b);
    return {
        r,
        g,
        b,
        sValue: hsv.sValue,
        v: hsv.v,
    };
};
exports.hslToRgbsv = hslToRgbsv;
const hsvToRgbsl = (h, s, v) => {
    const { r, g, b } = (0, exports.hsvToRgb)(h, s, v);
    const hsl = (0, exports.rgbToHsl)(r, g, b);
    return {
        r,
        g,
        b,
        sLightness: hsl.l,
        l: hsl.l,
    };
};
exports.hsvToRgbsl = hsvToRgbsl;
