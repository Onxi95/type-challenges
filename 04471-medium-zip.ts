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

type BetterZip<T extends unknown[], U extends unknown[], Result extends unknown[] = []> =
  Result['length'] extends T['length'] | U['length']
  ? Result
  : BetterZip<T, U, [...Result, [T[Result['length']], U[Result['length']]]]>

type test1 = Zip<[1, 2], [true, false]>
type test2 = BetterZip<[1, 2], [true, false]>