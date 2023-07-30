// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]


// ============= Your Code Here =============
type GetFormatters<T extends string> = T extends `${string}%${infer Formatter}${infer Rest}`
  ? Formatter extends "%" ? GetFormatters<Rest> : [Formatter, ...GetFormatters<Rest>]
  : []


type Format<T extends string, Formatters = GetFormatters<T>> = Formatters extends [infer First, ...infer Rest]
  ? First extends "d" ? (d1: number) => Format<T, Rest>
  : (s1: string) => Format<T, Rest>
  : string


type test1 = GetFormatters<'a%sbc'>
type test2 = GetFormatters<'a%dbc'>
type test3 = GetFormatters<'a%%dbc'>
type test4 = GetFormatters<'a%%%dbc'>
type test5 = GetFormatters<'a%dbc%s'>

type test6 = Format<'abc'>
type test7 = Format<'a%sbc'>
type test8 = Format<'a%dbc'>
type test9 = Format<'a%%%dbc'>
type test10 = Format<'a%dbc%s'>