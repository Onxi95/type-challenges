// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
]


// ============= Your Code Here =============
type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : false;

type IsNegativeNumber<T extends number, S = `${T}`> =
  number extends T
  ? never : IsUnion<T> extends true ? never
  : S extends `${infer First}${infer _}`
  ? First extends `-` ? true : false
  : never;

type test1 = IsNegativeNumber<number>
type unionTest = 1 | 2;
type test2 = unionTest extends [unionTest] ? true : false;