// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]


// ============= Your Code Here =============
type RequiredKeys<T extends Record<string, unknown>, Key extends keyof T = keyof T> =
  Key extends keyof T
  ? T extends Required<Pick<T, Key>> ? Key : never
  : never

type test1 = RequiredKeys<{ a: number; b?: string }>
type test2 = RequiredKeys<{ a: undefined; b?: undefined }>
type test3 = RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>
type test4 = RequiredKeys<{}>