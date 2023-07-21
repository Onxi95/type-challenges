// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============

type Fibonacci<T extends number,
  Iteration extends any[] = [null],
  Previous extends any[] = [],
  Current extends any[] = [null]> = Iteration['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...Iteration, null], Current, [...Previous, ...Current]>

type test1 = Fibonacci<8>