// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]


// ============= Your Code Here =============
type SnakeCase<T extends string> =
  T extends `${infer First}${infer Rest}`
  ? First extends Capitalize<First>
  ? `_${Uncapitalize<First>}${SnakeCase<Rest>}`
  : `${First}${SnakeCase<Rest>}`
  : T;

type test1 = SnakeCase<'userName'>
type test2 = SnakeCase<'UserName'>
type test3 = Uncapitalize<'UserName'>

type test4 = 'n' extends Capitalize<'n'> ? true : false;