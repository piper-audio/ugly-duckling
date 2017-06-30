/**
 * Created by lucast on 23/05/2017.
 */

export function interpolatingMapper(hexColours) {
  const colours = hexColours.map(n => {
    const i = parseInt(n, 16);
    return [ ((i >> 16) & 255) / 255.0,
      ((i >> 8) & 255) / 255.0,
      ((i) & 255) / 255.0 ];
  });
  const last = colours.length - 1;
  return (value => {
    const m = value * last;
    if (m >= last) {
      return colours[last];
    }
    if (m <= 0) {
      return colours[0];
    }
    const base = Math.floor(m);
    const prop0 = base + 1.0 - m;
    const prop1 = m - base;
    const c0 = colours[base];
    const c1 = colours[base + 1];
    return [ c0[0] * prop0 + c1[0] * prop1,
      c0[1] * prop0 + c1[1] * prop1,
      c0[2] * prop0 + c1[2] * prop1 ];
  });
}

export function iceMapper() {
  const hexColours = [
    // Based on ColorBrewer ylGnBu
    'ffffff', 'ffff00', 'f7fcf0', 'e0f3db', 'ccebc5', 'a8ddb5',
    '7bccc4', '4eb3d3', '2b8cbe', '0868ac', '084081', '042040'
  ];
  hexColours.reverse();
  return interpolatingMapper(hexColours);
}

export function greenMapper() {
  const blue = 0.6666;
  const pieslice = 0.3333;
  return (value => {
    const h = blue - value * 2.0 * pieslice;
    const s = 0.5 + value / 2.0;
    const v = value;
    return this.hsv2rgb(h, s, v);
  });
}

export function sunsetMapper() {
  return (value => {
    const r = (value - 0.24) * 2.38;
    const g = (value - 0.64) * 2.777;
    let b = (3.6 * value);
    if (value > 0.277) {
      b = 2.0 - b;
    }
    return [ r, g, b ];
  });
}

export function hsv2rgb(h, s, v) { // all values in range [0, 1]
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [ r, g, b ];
}
