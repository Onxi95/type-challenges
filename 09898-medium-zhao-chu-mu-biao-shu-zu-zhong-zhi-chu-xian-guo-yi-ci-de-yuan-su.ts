// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];

// ============= Your Code Here =============

type FindEles<
  T extends any[],
  Duplicates extends unknown[] = [],
  Uniques extends unknown[] = []
> = T extends [infer First, ...infer Rest]
  ? First extends Duplicates[number]
    ? FindEles<Rest, Duplicates, Uniques>
    : First extends Rest[number]
    ? FindEles<Rest, [...Duplicates, First], Uniques>
    : First extends Duplicates[number]
    ? FindEles<Rest, Duplicates, Uniques>
    : FindEles<Rest, Duplicates, [...Uniques, First]>
  : Uniques;

type test1 = [1, 2, 2, 3, 3, 4, 5, 6, 6, 6];
type test2 = FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>;
