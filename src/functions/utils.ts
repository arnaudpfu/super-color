import { SuperHexColor } from '../types';

export const rd = Math.round;
export const rd2 = (n: number): number => rd(n * 100) / 100;

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
export const flip = (o: {
    [name: string]: SuperHexColor;
}): { [value: SuperHexColor]: string } => {
    let flipped: { [value: SuperHexColor]: string } = {};
    for (let i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
};
