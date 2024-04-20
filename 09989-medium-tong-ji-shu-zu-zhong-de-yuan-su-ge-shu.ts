// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<["1", "2", "0"]>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<["a", "b", ["c", ["d"]]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

// ============= Your Code Here =============
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : T;

type ConvertArrToLength<T extends Record<number, any[]>> = {
  [Key in keyof T]: T[Key] extends any[] ? T[Key]["length"] : never;
};

type CountElementNumberToObject<
  T extends any[],
  Memory extends Record<number, any[]> = { [Key in Flatten<T>[number]]: [] }
> = Flatten<T> extends [infer First extends keyof Memory, ...infer Rest]
  ? Memory[First] extends any[]
    ? CountElementNumberToObject<
        Rest,
        {
          [Key in keyof Memory]: Key extends First
            ? [...Memory[First], Key]
            : Memory[Key];
        }
      >
    : never
  : ConvertArrToLength<Memory>;
