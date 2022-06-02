export * from './StringColors';
export declare type SuperColorFormat = 'hex' | 'hsl' | 'rgb' | 'hsv';
export interface SuperColorAttr {
    r: number;
    g: number;
    b: number;
    h: number;
    sLightness: number;
    l: number;
    sValue: number;
    v: number;
    a: number;
    format: SuperColorFormat;
}
export declare type SuperHexColor = string;
export interface SuperRgbaColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
export interface SuperHslaColor {
    h: number;
    sLightness: number;
    l: number;
    a: number;
}
export interface SuperHsvaColor {
    h: number;
    sValue: number;
    v: number;
    a: number;
}
export interface SuperRgbColor {
    r: number;
    g: number;
    b: number;
}
export interface SuperHslColor {
    h: number;
    sLightness: number;
    l: number;
}
export interface SuperHsvColor {
    h: number;
    sValue: number;
    v: number;
}
