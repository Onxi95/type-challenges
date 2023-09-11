// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<"title", GetReadonlyKeys<Todo1>>>,
  Expect<Equal<"title" | "description", GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed?: boolean;
}

// ============= Your Code Here =============
type GetReadonlyKeys<T> = keyof {
  [Key in keyof T as Equal<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true
    ? Key
    : never]: Key;
};

type test1 = GetReadonlyKeys<Todo1>;
