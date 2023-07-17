// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]


type Join<Delimiter extends string, Letters extends readonly string[]> =
  Letters extends [infer First extends string, ...infer Rest extends string[]]
  ? Rest extends [string, ...string[]] ?
  `${First}${Delimiter}${Join<Delimiter, Rest>}`
  : First
  : ''

type JoinTest1 = Join<'-', ['a', 'b', 'c']>
type JoinTest2 = Join<'-', ['a',]>

// ============= Your Code Here =============
declare function join<Delimiter extends string>(delimiter: Delimiter): <Letters extends readonly string[]>(...parts: Letters) =>
  Join<Delimiter, Letters>

type Test1 = typeof longOutput;
