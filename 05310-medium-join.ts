// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
    Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
    Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
    Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
    Expect<Equal<Join<["o"], "u">, "o">>
];

// ============= Your Code Here =============
type Join<T extends string[], U extends string | number> = T["length"] extends 1
    ? T[0]
    : T extends [infer First, ...infer Rest]
    ? First extends string
        ? Rest extends string[]
            ? `${First}${U}${Join<Rest, U>}`
            : never
        : never
    : never;
