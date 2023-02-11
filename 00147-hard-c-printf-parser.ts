// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]


// ============= Your Code Here =============
type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type ControlKeys = keyof ControlsMap;

const keys: ControlKeys = 'c'

type ParsePrintFormat<T extends string, Memory extends unknown[] = []> =
  T extends `${infer _}%${infer ControlKey}${infer Last}`
  ? ControlKey extends ControlKeys
    ? ParsePrintFormat<Last, [...Memory, ControlsMap[ControlKey]]>
    : never
  : Memory

type Test1 = ParsePrintFormat<'The result is %d.'>
type Test2 = ParsePrintFormat<'%d'>
type Test3 = ParsePrintFormat<'Hello %s: score is %d.'>