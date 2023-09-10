// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, "b">>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, "b">>,
  Expect<
    Equal<
      OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>,
      "b" | "c" | "d"
    >
  >,
  Expect<Equal<OptionalKeys<{}>, never>>
];

// ============= Your Code Here =============
type OptionalKeys<T> = {
  [Key in keyof T]-?: Record<never, never> extends Pick<T, Key> ? Key : never;
}[keyof T];

type test1 = OptionalKeys<{ a: number; b?: string }>;
type test2 = OptionalKeys<{ a: undefined; b?: undefined }>;
type test3 = Record<never, never> extends Pick<{ hello?: "hi" }, "hello">
  ? true
  : false;
