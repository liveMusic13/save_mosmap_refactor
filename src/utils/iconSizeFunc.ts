export function iconSizeDynamic(
  input: string,
  // iconAnchor: boolean,
  multiplyAndRound: boolean
): [number, number] {
  function round(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  const inputNumber = Number(input);

  // if (iconAnchor) {
  //   const result1 = round(inputNumber * 2.3 / 2.86, 1);
  //   const result2 = round(inputNumber * 2.3 / 2.78, 1);
  //   return [result1, result2];
  // }

  return multiplyAndRound ? [round(inputNumber * 2.3, 1), round(inputNumber * 2.3, 1)] : [inputNumber, inputNumber]
}
