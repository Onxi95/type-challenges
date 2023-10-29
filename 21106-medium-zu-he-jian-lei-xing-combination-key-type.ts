// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type CaseTypeOne =
  | "cmd ctrl"
  | "cmd opt"
  | "cmd fn"
  | "ctrl opt"
  | "ctrl fn"
  | "opt fn";

type cases = [Expect<Equal<Combs, CaseTypeOne>>];

// ============= Your Code Here =============
type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];

// 实现 Combs
type Combs<T extends string[] = ModifierKeys> = T extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${First} ${Rest[number]}` | Combs<Rest>
  : never;

type test1 = Combs;
