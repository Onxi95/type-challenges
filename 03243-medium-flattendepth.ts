// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

// ============= Your Code Here =============
type FlattenDepth<
  T extends any[],
  U extends number = 1,
  Depth extends any[] = []
> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Depth["length"] extends U
      ? [First, ...FlattenDepth<Rest, U, Depth>]
      : [
          ...FlattenDepth<First, U, [unknown, ...Depth]>,
          ...FlattenDepth<Rest, U, Depth>
        ]
    : [First, ...FlattenDepth<Rest, U, Depth>]
  : T;
