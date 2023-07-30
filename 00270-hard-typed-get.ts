// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]

type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}


// ============= Your Code Here =============
type GetProperties<T extends string> = T extends `${infer First}.${infer Rest}`
  ? [First, ...GetProperties<Rest>]
  : [T]

type Get<T extends Record<string, unknown>, K extends string, Props extends string[] = GetProperties<K>> =
  K extends keyof T
  ? T[K]
  : Props extends [infer First extends string, ...infer Rest extends string[]]
  ? T[First] extends Record<string, unknown> ? Get<T[First], K, Rest>
  : First extends keyof T
  ? T[First]
  : never
  : T

type test1 = GetProperties<'foo'>
type test2 = GetProperties<'foo.bar.count'>

type test3 = Get<Data, 'foo.bar.count'>
type test4 = Get<Data, 'foo.bar'>
type test5 = Get<Data, 'foo.baz'>
type test6 = Get<Data, 'no.existed'>