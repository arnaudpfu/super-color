import { SuperColorFormat } from '../types';
export declare const parseColor: (color: string) => {
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
} | false;
