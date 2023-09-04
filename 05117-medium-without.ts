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
  Current extends number[] = T,
  Union = U extends number[] ? U[number] : U,
  Results extends number[] = [],
  Counter extends any[] = []
> = Counter["length"] extends T["length"]
  ? Results
  : Current extends [infer First extends number, ...infer Rest extends number[]]
  ? First extends Union
    ? Without<T, U, Rest, Union, Results, [...Counter, 1]>
    : Without<T, U, Rest, Union, [...Results, First], [...Counter, 1]>
  : Results;

type test1 = Without<[1, 2], [1]>;
type test2 = Without<[1, 2, 4, 1, 5], [1, 2]>;
