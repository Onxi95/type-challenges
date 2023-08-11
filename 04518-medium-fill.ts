// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

// ============= Your Code Here =============
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Result extends unknown[] = [],
  ShouldStartReplacing extends boolean = Result["length"] extends Start
    ? true
    : false
> = Result["length"] extends End
  ? T
  : T extends [infer First, ...infer Rest]
  ? ShouldStartReplacing extends false
    ? [First, ...Fill<Rest, N, Start, End, [...Result, null]>]
    : [N, ...Fill<Rest, N, Start, End, [...Result, null], ShouldStartReplacing>]
  : T;

type test1 = Fill<[1, 2, 3], true>;
type test2 = Fill<[1, 2, 3], 0, 0, 0>;
type test3 = Fill<[1, 2, 3], true, 10, 20>;
type test4 = Fill<[1, 2, 3], true, 1, 3>;
type test5 = Fill<[1, 2, 3], true, 0, 10>;
