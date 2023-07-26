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

type Camelize<T extends Record<string, unknown>> = {
  [Key in keyof T as CamelizeKey<Key>]: T[Key] extends Record<string, unknown>
  ? Camelize<T[Key]>
  : T[Key] extends unknown[]
  ? CamelizeArr<T[Key]>
  : T[Key]
}

type CamelizeKey<T extends string | number | symbol> = T extends `${infer First}_${infer Rest}`
  ? CamelizeKey<`${First}${Capitalize<Rest>}`>
  : T

type CamelizeArr<T extends unknown[]> = T extends
  [infer First extends Record<string, unknown>, ...infer Rest extends Record<string, unknown>[]]
  ? [Camelize<First>, ...CamelizeArr<Rest>] : T;

type CamelizeObjAttrs<T extends Record<string, unknown>> = {
  [Key in keyof T as CamelizeKey<Key>]: T[Key] }

type test1 = CamelizeKey<'some_prop'>
type test2 = CamelizeKey<'some'>
type test3 = CamelizeKey<'some_'>

type test4 = CamelizeObjAttrs<{
  some_prop: string,
  some_other_prop: number;
}>

type test5 = Camelize<{
  some_prop: string
  prop: { another_prop: string }
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string },
  ]
}>
const Test5: test5 = {
  someProp: 'hi',
  prop: { anotherProp: 'hi' },
  array: [{ snakeCase: 'hi' }, { anotherElement: { yetAnotherProp: 'hi' } }, { yetAnotherElement: 'hi' }]
}

type test6 = CamelizeArr<[{ snake_case: 'hi' }, { another_element: { yet_another_prop: 'hi' } }, { yet_another_element: 'hi' }]>
const Test6: test6 = [{ snakeCase: 'hi' }, { anotherElement: { yetAnotherProp: 'hi' }, { yetAnotherElement: 'hi' }}]