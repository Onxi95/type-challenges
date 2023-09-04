// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============
type Without<
  T extends number[],
  U extends number | number[],
  Union = U extends number[] ? U[number] : U
> = T extends [infer First, ...infer Rest extends number[]]
  ? First extends Union
    ? Without<Rest, U, Union>
    : [First, ...Without<Rest, U, Union>]
  : [];

type test1 = Without<[1, 2], [1]>;
type test2 = Without<[1, 2, 4, 1, 5], [1, 2]>;
