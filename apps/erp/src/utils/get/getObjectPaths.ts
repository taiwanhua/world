// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-return */

export function getKeys(object: any, path = ""): any {
  if (!object || typeof object !== "object") return path;
  return Object.keys(object).map((key) =>
    getKeys(object[key], path ? [path, key].join(".") : key),
  );
}

export const objectPaths = (object: any): string[] => {
  return getKeys(object).toString().split(",");
};

// console.log(objectPaths({ x: { y: { z: 1 }, g: { a: 1, b: 2 } } }));
// ->['x.y.z', 'x.g.a', 'x.g.b']
