// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<Last<[3, 2, 1]>, 1>>,
    Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];

// ============= Your Code Here =============

type BuildTuple<L extends number, T extends any[] = []> = T extends {
    length: L;
}
    ? T
    : BuildTuple<L, [...T, any]>;

type Last<T extends any[]> = T extends [...infer Items, infer LastItem]
    ? LastItem
    : never;
