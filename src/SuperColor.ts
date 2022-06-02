import { SUPER_COLOR_HEX_NAMES } from './constants/HexNames';
import {
    hexToRgba,
    hslToRgb,
    rgbToHslsv,
    hslToRgbsv,
    hsvToRgbsl,
} from './functions/conversion';
import { parseColor } from './functions/parsing';
import { rd, rd2 } from './functions/utils';
import {
    SuperColorAttr,
    SuperColorFormat,
    SuperHexColor,
    SuperHslaColor,
    SuperHslColor,
    SuperHsvaColor,
    SuperRgbaColor,
    SuperRgbColor,
} from './types';

export class SuperColor {
    private r: number; //[0-255]
    private g: number; //[0-255]
    private b: number; //[0-255]
    private h: number; //[0-360]
    private sLightness: number; //[0-1]
    private l: number; //[0-1]
    private sValue: number; //[0-1]
    private v: number; //[0-1]
    private a: number; //[0-1]
    private format: SuperColorFormat;

    constructor(color: string | SuperColorAttr) {
        if (typeof color === 'string') {
            const parsed = parseColor(color);

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
            } else {
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
        } else {
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

    getFormat(): SuperColorFormat {
        return this.format;
    }

    setFormat(format: SuperColorFormat) {
        this.format = format;
    }

    setAlpha(alpha: number) {
        this.a = alpha;
    }

    setHue(hue: number) {
        // stable: sValue,sLightness,l,v
        const { r, g, b } = hslToRgb(hue, this.sLightness, this.l);
        this.r = r;
        this.g = g;
        this.b = b;
        this.h = hue;
    }

    setHex(color: string) {
        const { r, g, b, a } = hexToRgba(color);
        const { h, sLightness, l, sValue, v } = rgbToHslsv(r, g, b);

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

    setRgb(rgbValue: { r?: number; g?: number; b?: number }) {
        // stable a
        const rgb: SuperRgbColor = {
            r: this.r,
            g: this.g,
            b: this.b,
            ...rgbValue,
        };
        const { h, sLightness, l, sValue, v } = rgbToHslsv(rgb.r, rgb.g, rgb.b);

        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;

        this.h = h;
        this.sLightness = sLightness;
        this.l = l;
        this.sValue = sValue;
        this.v = v;
    }

    setHsl(hslValue: { h?: number; sLightness?: number; l?: number }) {
        // stable a
        const hsl: SuperHslColor = {
            h: this.h,
            sLightness: this.sLightness,
            l: this.l,
            ...hslValue,
        };
        const { r, g, b, sValue, v } = hslToRgbsv(hsl.h, hsl.sLightness, hsl.l);

        this.h = hsl.h;
        this.sLightness = hsl.sLightness;
        this.l = hsl.l;
        this.sValue = sValue;
        this.v = v;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    setHsv(hsvValue: { h?: number; sValue?: number; v?: number }) {
        //stable h,a,
        const hsv = {
            h: this.h,
            sValue: this.sValue,
            v: this.v,
            ...hsvValue,
        };
        const { r, g, b, sLightness, l } = hsvToRgbsl(hsv.h, hsv.sValue, hsv.v);
        this.sValue = hsv.sValue;
        this.v = hsv.v;

        this.r = r;
        this.g = g;
        this.b = b;
        this.sLightness = sLightness;
        this.l = l;
    }

    toHex(): SuperHexColor {
        let alpha = this.a !== 1 ? rd(this.a * 255).toString(16) : 'ff';
        let red = rd(this.r).toString(16);
        let green = rd(this.g).toString(16);
        let blue = rd(this.b).toString(16);

        alpha = alpha.length === 1 ? '0' + alpha : alpha;
        red = red.length === 1 ? '0' + red : red;
        blue = blue.length === 1 ? '0' + blue : blue;
        green = green.length === 1 ? '0' + green : green;

        if (
            alpha[0] === alpha[1] &&
            red[0] === red[1] &&
            blue[0] === blue[1] &&
            green[0] === green[1]
        ) {
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

    toRgba(): SuperRgbaColor {
        return {
            r: rd(this.r),
            g: rd(this.g),
            b: rd(this.b),
            a: rd2(this.a),
        };
    }

    toRgbaString(): string {
        return this.a === 1
            ? `rgb(${rd(this.r)}, ${rd(this.g)}, ${rd(this.b)})`
            : `rgba(${rd(this.r)}, ${rd(this.g)}, ${rd(this.b)}, ${rd2(this.a)})`;
    }

    toHsla(): SuperHslaColor {
        return {
            h: rd(this.h),
            sLightness: rd2(this.sLightness),
            l: rd2(this.l),
            a: rd2(this.a),
        };
    }

    toHslaString(): string {
        return this.a === 1
            ? `hsl(${rd(this.h)}deg, ${rd(this.sLightness * 100)}%, ${rd(this.l * 100)}%)`
            : `hsla(${rd(this.h)}deg, ${rd(this.sLightness * 100)}%, ${rd(
                  this.l * 100
              )}%, ${rd2(this.a)})`;
    }

    toHsva(): SuperHsvaColor {
        return {
            h: rd(this.h),
            sValue: rd2(this.sValue),
            v: rd2(this.v),
            a: rd2(this.a),
        };
    }

    toHsvaString(): string {
        return this.a === 1
            ? `hsv(${rd(this.h)}deg, ${rd(this.sValue * 100)}%, ${rd(this.v * 100)}%)`
            : `hsva(${rd(this.h)}deg, ${rd(this.sValue * 100)}%, ${rd(this.v * 100)}%, ${rd2(
                  this.a
              )})`;
    }

    toString(canBeColorName = true): string {
        let stringColor: string = this.toHex();

        if (canBeColorName && SUPER_COLOR_HEX_NAMES[stringColor]) {
            return SUPER_COLOR_HEX_NAMES[stringColor];
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
