// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============

type CapitalizeKey<T extends string | number | symbol> = T extends string | number
  ? Capitalize<`${T}`>
  : never;

type CapitalizeArray<T extends unknown[]> = T extends
  [infer First extends Record<string, unknown>, ...infer Rest extends Record<string, unknown>[]]
  ? [{ [Key in keyof First as CapitalizeKey<Key>]: First[Key] }, ...CapitalizeArray<Rest>] : T;


type CapitalizeNestObjectKeys<T> = {
  [Key in keyof T as CapitalizeKey<Key>]: T[Key] extends
  Record<string, unknown>[]
  ? CapitalizeArray<T[Key]>
  : T[Key] extends Record<string, unknown>
  ? CapitalizeNestObjectKeys<T[Key]>
  : T[Key];
}

type test1 = CapitalizeNestObjectKeys<foo>
const Test1: test1 = { Foo: 'asd', Bars: [{ Foo: 'hi' }] }