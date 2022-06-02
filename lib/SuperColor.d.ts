import { SuperColorAttr, SuperColorFormat, SuperHexColor, SuperHslaColor, SuperHsvaColor, SuperRgbaColor } from './types';
export declare class SuperColor {
    private r;
    private g;
    private b;
    private h;
    private sLightness;
    private l;
    private sValue;
    private v;
    private a;
    private format;
    constructor(color: string | SuperColorAttr);
    getFormat(): SuperColorFormat;
    setFormat(format: SuperColorFormat): void;
    setAlpha(alpha: number): void;
    setHue(hue: number): void;
    setHex(color: string): void;
    setRgb(rgbValue: {
        r?: number;
        g?: number;
        b?: number;
    }): void;
    setHsl(hslValue: {
        h?: number;
        sLightness?: number;
        l?: number;
    }): void;
    setHsv(hsvValue: {
        h?: number;
        sValue?: number;
        v?: number;
    }): void;
    toHex(): SuperHexColor;
    toRgba(): SuperRgbaColor;
    toRgbaString(): string;
    toHsla(): SuperHslaColor;
    toHslaString(): string;
    toHsva(): SuperHsvaColor;
    toHsvaString(): string;
    toString(canBeColorName?: boolean): string;
}
