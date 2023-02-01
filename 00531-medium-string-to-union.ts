// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<StringToUnion<"">, never>>,
    Expect<Equal<StringToUnion<"t">, "t">>,
    Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
    Expect<
        Equal<
            StringToUnion<"coronavirus">,
            "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
        >
    >
];

// ============= Your Code Here =============

type ConvertStringToArray<T extends string> =
    T extends `${infer First}${infer Second}`
    ? [First, ConvertStringToArray<Second>][number]
    : never;

type StringToUnion<T extends string> = ConvertStringToArray<T>;


type test1 = StringToUnion<"t">
type ConvertStringToArray2<T extends string> = T extends `${infer First}${infer Second}`
    ? First | ConvertStringToArray2<Second>
    : never

type test2 = ConvertStringToArray2<"hello">