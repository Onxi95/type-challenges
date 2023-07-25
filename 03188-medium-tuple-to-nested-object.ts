// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]


// ============= Your Code Here =============
type TupleToNestedObject<T extends string[], U> =
  T extends [infer First extends string, ...infer Rest extends string[]]
  ? Record<First, TupleToNestedObject<Rest, U>>
  : U;

type test1 = TupleToNestedObject<[], boolean>
type test2 = TupleToNestedObject<['a', 'b', 'c'], boolean>
type test3 = TupleToNestedObject<['a'], boolean>