export * from './StringColors'

export type SuperColorFormat = 'hex' | 'hsl' | 'rgb' | 'hsv';

export interface SuperColorAttr {
    r: number; //[0-255]
    g: number; //[0-255]
    b: number; //[0-255]
    h: number; //[0-360]
    sLightness: number; //[0-1]
    l: number; //[0-1]
    sValue: number; //[0-1]
    v: number; //[0-1]
    a: number; //[0-1]
    format: SuperColorFormat;
}

export type SuperHexColor = string;

export interface SuperRgbaColor {
    r: number; //[0-255]
    g: number; //[0-255]
    b: number; //[0-255]
    a: number; //[0-1]
}

export interface SuperHslaColor {
    h: number; //[0-360]
    sLightness: number; //[0-1]
    l: number; //[0-1]
    a: number; //[0-1]
}

export interface SuperHsvaColor {
    h: number; //[0-360]
    sValue: number; //[0-1]
    v: number; //[0-1]
    a: number; //[0-1]
}

export interface SuperRgbColor {
    r: number; //[0-255]
    g: number; //[0-255]
    b: number; //[0-255]
}

export interface SuperHslColor {
    h: number; //[0-360]
    sLightness: number; //[0-1]
    l: number; //[0-1]
}

export interface SuperHsvColor {
    h: number; //[0-360]
    sValue: number; //[0-1]
    v: number; //[0-1]
}