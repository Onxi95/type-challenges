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
type Get<T, K extends string> =
  K extends keyof T ? T[K]
  : K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
  ? Get<T[First], Rest>
  : never
  : K extends keyof T
  ? T[K]
  : never

type test3 = Get<Data, 'foo.bar.count'>
type test4 = Get<Data, 'foo.bar'>
type test5 = Get<Data, 'foo.baz'>
type test6 = Get<Data, 'no.existed'>