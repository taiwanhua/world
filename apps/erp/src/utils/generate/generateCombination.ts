export type Material = string[];
export type Combination = (string | null)[];

export const generateCombination = (
  materials: Material[],
  fillEmpty: string | null | false = false,
): Combination[] => {
  const isNeedFill = fillEmpty !== false;

  if (materials.length === 0) {
    return isNeedFill ? [[fillEmpty]] : [];
  }

  if (materials.length === 1) {
    return isNeedFill && materials[0].length === 0
      ? [[fillEmpty]]
      : materials[0].map((item) => [item]);
  }

  const [first, ...rest] = materials;
  const restCombinations = generateCombination(rest, fillEmpty);

  const firstCombination =
    isNeedFill && first.length === 0 ? [fillEmpty] : first;

  return firstCombination.flatMap((item) =>
    restCombinations.map((combination) => [item, ...combination]),
  );
};

// const ids = [
//   ["a1", "a2"],
//   ["b1", "b2"],
//   ["c1", "c2"],
// ];

// console.log("not fill", generateCombination(ids));
// console.log("fill", generateCombination(ids, "fill"));
