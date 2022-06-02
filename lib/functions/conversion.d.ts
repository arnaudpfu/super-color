import { SuperHslColor, SuperHsvColor, SuperRgbaColor, SuperRgbColor } from '../types';
export declare const rgbToHsl: (r: number, g: number, b: number) => SuperHslColor;
export declare const hslToRgb: (h: number, s: number, l: number) => SuperRgbColor;
export declare const hsvToRgb: (h: number, s: number, v: number) => SuperRgbColor;
export declare const rgbToHsv: (r: number, g: number, b: number) => SuperHsvColor;
export declare const hexToRgba: (hex: string) => SuperRgbaColor;
export declare const rgbToHslsv: (r: number, g: number, b: number) => {
    h: number;
    sLightness: number;
    l: number;
    sValue: number;
    v: number;
};
export declare const hslToRgbsv: (h: number, s: number, l: number) => {
    r: number;
    g: number;
    b: number;
    sValue: number;
    v: number;
};
export declare const hsvToRgbsl: (h: number, s: number, v: number) => {
    r: number;
    g: number;
    b: number;
    sLightness: number;
    l: number;
};
