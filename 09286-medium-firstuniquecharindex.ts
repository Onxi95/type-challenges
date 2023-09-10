// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

// ============= Your Code Here =============
type FirstUniqueCharIndex<
  T extends string,
  Memory extends any[] = []
> = T extends ""
  ? -1
  : T extends `${infer First}${infer Rest}`
  ? First extends Memory[number]
    ? FirstUniqueCharIndex<Rest, [...Memory, First]>
    : Rest extends `${string}${First}${string}`
    ? FirstUniqueCharIndex<Rest, [...Memory, First]>
    : Memory["length"]
  : never;

type test1 = FirstUniqueCharIndex<"leetcode">;
type test2 = FirstUniqueCharIndex<"">;
type test3 = FirstUniqueCharIndex<"aaa">;
type test4 = FirstUniqueCharIndex<"aabb">;
