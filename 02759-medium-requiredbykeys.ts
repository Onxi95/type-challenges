// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>
];

// ============= Your Code Here =============
type MapKeys<T> = { [Key in keyof T]: T[Key] };

type RequiredByKeys<
  T,
  K extends keyof T | never = never,
  RequiredFields = Required<Pick<T, K>>
> = [K] extends [never]
  ? Required<T>
  : MapKeys<RequiredFields & Omit<T, keyof RequiredFields>>;

type test1 = RequiredByKeys<User, "name">;
const Test1: test1 = { name: "asd", address: "asd", age: 123 };
