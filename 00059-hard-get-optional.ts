// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >
];

// ============= Your Code Here =============
type GetOptionalKeys<T> = {
  [Key in keyof T]-?: Record<never, never> extends Pick<T, Key> ? Key : never;
}[keyof T];

type GetOptional<T> = {
  [Key in keyof T as Key extends GetOptionalKeys<T> ? Key : never]: T[Key];
};

type test1 = GetOptional<{ foo: number; bar?: string }>;
type test2 = GetOptional<{ foo: undefined; bar?: undefined }>;
