// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


// ============= Your Code Here =============
type GetRequired<T extends Record<string, unknown>> = {
  [Key in keyof T as T[Key] extends Required<T>[Key] ? Key : never]: T[Key]
}

type test1 = GetRequired<{ foo: number; bar?: string }>
type test2 = GetRequired<{ foo: undefined; bar?: undefined }>