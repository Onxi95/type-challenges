// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]


// ============= Your Code Here =============
type SplitByAmpersand<T extends string, Result extends string[] = []> =
  T extends `${infer First}&${infer Rest}`
  ? SplitByAmpersand<Rest, [First, ...Result]>
  : T extends ''
  ? []
  : [...Result, T]

type SplitByEqual<T extends string> = T extends `${infer Key}=${infer Value}` ? [Key, Value] : [T, true];

type GetKeys<T extends string[]> =
  T extends [infer First extends string, ...infer Rest extends string[]]
  ? SplitByEqual<First>[0] | GetKeys<Rest>
  : never;

type MapParamsToArray<T extends string[]> =
  T extends [infer First extends string, ...infer Rest extends string[]]
  ? [SplitByEqual<First>, ...MapParamsToArray<Rest>]
  : [];

type KeyValueTuple = [string, string | true]

type FindValuesInTupleArray<T extends KeyValueTuple[],
  Key extends string | number | symbol,
  Result extends Array<string | true> = []>
  = T extends [infer First extends KeyValueTuple, ...infer Rest extends KeyValueTuple[]] ?
  First[0] extends Key
  ? FindValuesInTupleArray<Rest, Key, [...Result, First[1]]>
  : FindValuesInTupleArray<Rest, Key, [...Result]>
  : Result

type MapUnionToDict<T extends string[],
  Keys extends string = GetKeys<T>,
  Dict extends Record<string, string[]> = { [Key in Keys]: [] }> =
  { [Key in keyof Dict]: FindValuesInTupleArray<MapParamsToArray<T>, Key> }


type ParseQueryString<T extends string> =
  SplitByAmpersand<T>['length'] extends 0 ? {} : MapUnionToDict<SplitByAmpersand<T>>

type test1 = ParseQueryString<'k1=v1&k1=v2'>

type test2 = SplitByAmpersand<'k1=v1&k1=v2&k2=v3'>
type test3 = SplitByAmpersand<'k1=v1'>
type test4 = SplitByAmpersand<''>

type test5 = SplitByEqual<'k1=v2'>
type test6 = SplitByEqual<'k1'>

type test7 = MapParamsToArray<SplitByAmpersand<'k1=v1&k1=v2&k2=v3'>>

type test8 = GetKeys<SplitByAmpersand<'k1=v1&k1=v2&k2=v3'>>
type test9 = MapUnionToDict<SplitByAmpersand<'k1=v1&k1=v2&k2=v3&k1'>>
type test10 = Extract<[["k2", "v3"], ["k1", "v2"], ["k1", "v1"], ["k1", true]][number], ["k1", any]>
type test11 = FindValuesInTupleArray<[['hi', 'hello']], 'hi'>

type test12 = ParseQueryString<'k1&k1=v1'>