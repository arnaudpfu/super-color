# Super Color

Small & Fast Color conversion library.

## Installation

```
npm i super-color
```

## Examples

```ts
import SuperColor from "super-color";

const superColor = new SuperColor("#f00");
console.log(superColor.toString()); // #f00

superColor.setFormat("hsl");
console.log(superColor.toString()); // hsl(0deg, 100%, 50%)

superColor.setFormat("rgb");
console.log(superColor.toString()); // rgb(255, 0, 0)

superColor.setAlpha(0.5);
console.log(superColor.toString()); // rgba(255, 0, 0, 0.5)

superColor.setHsv({ h: 100, v: 0.8 });
console.log(superColor.toString()); // hsva(100, 100, 80, 0.5)

superColor.setFormat("hex");
console.log(superColor.toString()); // #43CC0080
```

## License

[GPL](https://www.gnu.org/licenses/gpl-3.0.html) licensed.
