// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
];

// ============= Your Code Here =============
type Subsequence<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [First] | [...Subsequence<Rest>] | [First, ...Subsequence<Rest>]
  : [];

type test1 = Subsequence<[1, 2]>;
type test2 = Subsequence<[1, 2, 3]>;
