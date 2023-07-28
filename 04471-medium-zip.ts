// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]


// ============= Your Code Here =============
type Zip<T extends unknown[], U extends unknown[], Result extends unknown[][] = []> =
  T extends [infer FirstA, ...infer RestA]
  ? U extends [infer FirstB, ...infer RestB]
  ? Zip<RestA, RestB, [...Result, [FirstA, FirstB]]>
  : Result
  : Result;

type test1 = Zip<[1, 2], [true, false]>