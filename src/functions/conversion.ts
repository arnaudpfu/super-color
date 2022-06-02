// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]

import { SuperHslColor, SuperHsvColor, SuperRgbaColor, SuperRgbColor } from '../types';

// *Returns:* { h[0,360], s[0,1], l[0,1] }
export const rgbToHsl = (r: number, g: number, b: number): SuperHslColor => {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0,
        l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
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

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 360] and s and l are contained [0, 1]
// *Returns:* { r, g, b } in the set [0, 255]
export const hslToRgb = (h: number, s: number, l: number): SuperRgbColor => {
    let r, g, b;

    h /= 360;

    function hue2rgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    if (s === 0) {
        r = g = b = l;
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
};

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
export const hsvToRgb = (h: number, s: number, v: number): SuperRgbColor => {
    h *= 6 / 360;

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
};

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
export const rgbToHsv = (r: number, g: number, b: number): SuperHsvColor => {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0,
        v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
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

export const hexToRgba = (hex: string): SuperRgbaColor => {
    let c: string[] = hex.substring(1).split('');

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

    const rgba: number[] = c.map((char) => parseInt(char, 16));
    rgba[3] = rgba[3] / 255;
    return {
        r: rgba[0],
        g: rgba[1],
        b: rgba[2],
        a: rgba[3],
    };
};

export const rgbToHslsv = (
    r: number,
    g: number,
    b: number
): {
    h: number;
    sLightness: number;
    l: number;
    sValue: number;
    v: number;
} => {
    const hsl = rgbToHsl(r, g, b);
    const hsv = rgbToHsv(r, g, b);

    return {
        h: hsl.h,
        sLightness: hsl.sLightness,
        l: hsl.l,
        sValue: hsv.sValue,
        v: hsv.v,
    };
};

export const hslToRgbsv = (
    h: number,
    s: number,
    l: number
): {
    r: number;
    g: number;
    b: number;
    sValue: number;
    v: number;
} => {
    const { r, g, b } = hslToRgb(h, s, l);
    const hsv = rgbToHsv(r, g, b);

    return {
        r,
        g,
        b,
        sValue: hsv.sValue,
        v: hsv.v,
    };
};

export const hsvToRgbsl = (
    h: number,
    s: number,
    v: number
): {
    r: number;
    g: number;
    b: number;
    sLightness: number;
    l: number;
} => {
    const { r, g, b } = hsvToRgb(h, s, v);
    const hsl = rgbToHsl(r, g, b);

    return {
        r,
        g,
        b,
        sLightness: hsl.l,
        l: hsl.l,
    };
};
