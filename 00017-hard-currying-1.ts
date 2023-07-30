// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


// ============= Your Code Here =============
type Curry<T> = T extends (...params: infer Params) => infer Return
  ? Params extends [infer First, ...infer Rest]
  ? (param: First) => Rest['length'] extends 0 ? Return : Curry<(...params: Rest) => Return>
  : () => Return
  : never

declare function Currying<T>(fn: T): Curry<T>

type test1 = typeof curried1
type test2 = typeof curried3