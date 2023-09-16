// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];

// ============= Your Code Here =============

type GetFirstNItems<
  Arr extends unknown[],
  N extends number,
  Result extends unknown[] = []
> = Result["length"] extends N
  ? Result
  : Arr extends [infer First, ...infer Rest]
  ? GetFirstNItems<Rest, N, [...Result, First]>
  : Result;

type SkipFirstItemInArray<Arr extends unknown[]> = Arr extends [
  infer _,
  ...infer Rest
]
  ? Rest
  : Arr;

type OffsetArrayBy<
  Arr extends unknown[],
  OffsetIdx extends number,
  Result extends unknown[] = [],
  Memory extends unknown[] = []
> = OffsetIdx extends 0
  ? Arr
  : Memory["length"] extends OffsetIdx
  ? SkipFirstItemInArray<Result>
  : Arr extends [infer First, ...infer Rest]
  ? OffsetArrayBy<Rest, OffsetIdx, [First, ...Rest], [...Memory, First]>
  : SkipFirstItemInArray<Result>;

// https://github.com/type-challenges/type-challenges/issues/22110
type NormalizeToNonNegativeInt<
  Arr extends unknown[],
  N extends number
  //                                                  v - quite interesting
> = `${N}` extends `-${infer P extends number}` ? Slice<Arr, P>["length"] : N;

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"]
> = OffsetArrayBy<
  GetFirstNItems<Arr, NormalizeToNonNegativeInt<Arr, End>>,
  NormalizeToNonNegativeInt<Arr, Start>
>;

type test1 = Slice<Arr, 0, 1>;

type test2 = GetFirstNItems<Arr, 0>;
type test3 = GetFirstNItems<[5, 4, 3, 2, 1], 3>;

type test4 = OffsetArrayBy<Arr, 2>;
type test5 = OffsetArrayBy<Arr, 3>;

type test6 = Slice<Arr, 0, 3>;
type test7 = Slice<Arr, 1, 3>;
type test8 = Slice<Arr, 0, 1>;
type test9 = OffsetArrayBy<Arr, 0>;

type test10 = NormalizeToNonNegativeInt<Arr, 5>;
type test11 = NormalizeToNonNegativeInt<Arr, -2>;
type test12 = NormalizeToNonNegativeInt<Arr, 0>;
