// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============

type ParseStringAccessors<T extends string> = T extends `${infer First}.${infer Second}`
  ? [First, ...ParseStringAccessors<Second>]
  : [T];
type DeepPick<T extends Record<string, unknown>, S extends string, Attrs = ParseStringAccessors<S>> =
  Attrs extends [infer First extends string, ...infer Rest extends string[]]
  ? T[First] extends Record<string, unknown>
  ? Pick<T, First> & DeepPick<T[First], S, Rest>
  : T
  : {}


type test1 = ParseStringAccessors<'obj.obj2.i'>
type test2 = ParseStringAccessors<'a'>

type test3 = DeepPick<Obj, 'a'>
const Test3: test3 = { a: 123 }

type test4 = DeepPick<Obj, 'a' | ''>
const Test4: test4 = { a: 123 }