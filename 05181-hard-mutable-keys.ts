// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, "a">>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, "a">>,
  Expect<
    Equal<
      MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<MutableKeys<{}>, never>>
];

// ============= Your Code Here =============
type MutableKeys<T> = keyof {
  [Key in keyof T as Equal<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true
    ? never
    : Key]: Key;
};

type MutableKeys2<T> = keyof {
  -readonly [Key in keyof T as Equal<
    Pick<T, Key>,
    Readonly<Pick<T, Key>>
  > extends true
    ? never
    : Key]: Key;
};

type test1 = MutableKeys<{ a: number; readonly b: string }>;
type test2 = MutableKeys<{ a: undefined; readonly b: undefined }>;
type test3 = MutableKeys<{
  a: undefined;
  readonly b?: undefined;
  c: string;
  d: null;
}>;
