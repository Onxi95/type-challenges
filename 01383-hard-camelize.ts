// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============

type Camelize<T> = any

type CamelizeStr<T extends string> = T extends `${infer First}_${infer Rest}`
  ? CamelizeStr<`${First}${Capitalize<Rest>}`>
  : T

type test1 = CamelizeStr<'some_prop'>
type test2 = CamelizeStr<'some'>
type test3 = CamelizeStr<'some_'>