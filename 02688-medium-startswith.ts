// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
    Expect<Equal<StartsWith<"abc", "ac">, false>>,
    Expect<Equal<StartsWith<"abc", "ab">, true>>,
    Expect<Equal<StartsWith<"abc", "abcd">, false>>
];

// ============= Your Code Here =============
type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
    ? true
    : false;
