import { SUPER_COLOR_NAMES } from '../constants/ColorNames';
import { MATCHERS } from '../constants/Matchers';
import { SuperColorFormat } from '../types';
import { hslToRgbsv, hsvToRgbsl, rgbToHslsv } from './conversion';

let trimLeft = /^\s+/,
    trimRight = /\s+$/;

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
export const parseColor = (
    color: string
):
    | {
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
    | false => {
    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
    if (SUPER_COLOR_NAMES[color]) {
        color = SUPER_COLOR_NAMES[color];
    } else if (color === 'transparent') {
        color = '#0000';
    }

    let match;
    if ((match = MATCHERS.rgb.exec(color))) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = 1;
        const { h, sLightness, l, sValue, v } = rgbToHslsv(r, g, b);
        const format = 'rgb';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.rgba.exec(color))) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = parseFloat(match[4]);
        const { h, sLightness, l, sValue, v } = rgbToHslsv(r, g, b);
        const format = 'rgb';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hsl.exec(color))) {
        const h = parseFloat(match[1]);
        const sLightness = parseFloat(match[2]);
        const l = parseFloat(match[3]);
        const a = 1;
        const { r, g, b, sValue, v } = hslToRgbsv(h, sLightness, l);
        const format = 'hsl';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hsla.exec(color))) {
        const h = parseFloat(match[1]);
        const sLightness = parseFloat(match[2]);
        const l = parseFloat(match[3]);
        const a = parseFloat(match[4]);
        const { r, g, b, sValue, v } = hslToRgbsv(h, sLightness, l);
        const format = 'hsl';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hsv.exec(color))) {
        const h = parseFloat(match[1]);
        const sValue = parseFloat(match[2]);
        const v = parseFloat(match[3]);
        const a = 1;
        const { r, g, b, sLightness, l } = hsvToRgbsl(h, sValue, v);
        const format = 'hsv';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hsva.exec(color))) {
        const h = parseFloat(match[1]);
        const sValue = parseFloat(match[2]);
        const v = parseFloat(match[3]);
        const a = parseFloat(match[4]);
        const { r, g, b, sLightness, l } = hsvToRgbsl(h, sValue, v);
        const format = 'hsv';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hex8.exec(color))) {
        const r = parseInt(match[1], 16);
        const g = parseInt(match[2], 16);
        const b = parseInt(match[3], 16);
        const a = parseInt(match[4], 16) / 255;
        const { h, sLightness, l, sValue, v } = rgbToHslsv(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hex6.exec(color))) {
        const r = parseInt(match[1], 16);
        const g = parseInt(match[2], 16);
        const b = parseInt(match[3], 16);
        const a = 1;
        const { h, sLightness, l, sValue, v } = rgbToHslsv(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hex4.exec(color))) {
        const r = parseInt(match[1] + '' + match[1], 16);
        const g = parseInt(match[2] + '' + match[2], 16);
        const b = parseInt(match[3] + '' + match[3], 16);
        const a = parseInt(match[4] + '' + match[4], 16) / 255;
        const { h, sLightness, l, sValue, v } = rgbToHslsv(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }
    if ((match = MATCHERS.hex3.exec(color))) {
        const r = parseInt(match[1] + '' + match[1], 16);
        const g = parseInt(match[2] + '' + match[2], 16);
        const b = parseInt(match[3] + '' + match[3], 16);
        const a = 1;
        const { h, sLightness, l, sValue, v } = rgbToHslsv(r, g, b);
        const format = 'hex';
        return { r, g, b, h, sLightness, l, sValue, v, a, format };
    }

    return false;
};
