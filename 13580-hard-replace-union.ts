// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<
    Equal<
      UnionReplace<
        Function | Date | object,
        [[Date, string], [Function, undefined]]
      >,
      undefined | string | object
    >
  >
];

// ============= Your Code Here =============
type UnionReplace<T, U extends [any, any][]> = U extends [
  infer First,
  ...infer Rest extends [any, any][]
]
  ? First extends [infer Source, infer Target]
    ? UnionReplace<Exclude<T, Source> | Target, Rest>
    : never
  : T;

type testUnion = "a" | "b" | "c";

type test1 = Extract<testUnion, "a">;
type test2 = Exclude<testUnion, "a">;

type test3 = UnionReplace<number | string, [[string, null]]>;
type test4 = UnionReplace<number | string, []>;
