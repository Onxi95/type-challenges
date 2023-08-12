// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<BinaryToDecimal<"10">, 2>>,
  Expect<Equal<BinaryToDecimal<"0011">, 3>>,
  Expect<Equal<BinaryToDecimal<"00000000">, 0>>,
  Expect<Equal<BinaryToDecimal<"11111111">, 255>>,
  Expect<Equal<BinaryToDecimal<"10101010">, 170>>
];

// ============= Your Code Here =============
type BinaryToDecimal<
  S extends string,
  Result extends unknown[] = [],
  Debug extends unknown[] = []
> = S extends `${infer First}${infer Rest}`
  ? First extends "1"
    ? BinaryToDecimal<
        Rest,
        [...Result, ...Result, 1],
        [...Debug, [...Result, ...Result, 1]]
      >
    : BinaryToDecimal<
        Rest,
        [...Result, ...Result],
        [...Debug, [...Result, ...Result, 1]]
      >
  : Result["length"];

type test1 = BinaryToDecimal<"0011">;
