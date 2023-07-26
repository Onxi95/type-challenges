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

type CamelizeKey<T extends string | number | symbol> = T extends `${infer First}_${infer Rest}`
  ? CamelizeKey<`${First}${Capitalize<Rest>}`>
  : T

type CamelizeObjAttrs<T extends Record<string, unknown>> = {
  [Key in keyof T as CamelizeKey<Key>]: T[Key] }

type test1 = CamelizeKey<'some_prop'>
type test2 = CamelizeKey<'some'>
type test3 = CamelizeKey<'some_'>

type test4 = CamelizeObjAttrs<{
  some_prop: string,
  some_other_prop: number;
}>