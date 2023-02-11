// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============
type CamelCase<S extends string> =
  S extends `${infer First}_${infer Second}`
  ? `${Lowercase<First>}${Capitalize<CamelCase<Second>>}`
  : Lowercase<S>

type Test1 = CamelCase<'foo_bar_hello_world'>
type Test2 = CamelCase<'HELLO_WORLD_WITH_TYPES'>
type Test3 = CamelCase<'FOOBAR'>