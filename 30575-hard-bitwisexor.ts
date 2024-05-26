// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<BitwiseXOR<"0", "1">, "1">>,
  Expect<Equal<BitwiseXOR<"1", "1">, "0">>,
  Expect<Equal<BitwiseXOR<"10", "1">, "11">>,
  Expect<Equal<BitwiseXOR<"110", "1">, "111">>,
  Expect<Equal<BitwiseXOR<"101", "11">, "110">>
];

type ReverseStr<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : T;

type ReverseStrTest1 = ReverseStr<"123">;

type XORLookup = {
  "00": "0";
  "01": "1";
  "10": "1";
  "11": "0";
};

type Binary = 0 | 1;

type ConvertStrToArray<
  T extends string,
  Memory extends string[] = []
> = T extends `${infer First}${infer Rest}`
  ? ConvertStrToArray<Rest, [...Memory, First]>
  : Memory;

type ConvertStrToArrayTest1 = ConvertStrToArray<"010011">;

type PadArrays<
  T extends string[],
  U extends string[],
  Iterator extends any[] = [],
  TResult extends string[] = [],
  UResult extends string[] = []
> = undefined extends T[Iterator["length"]] & U[Iterator["length"]]
  ? [TResult, UResult]
  : PadArrays<
      T,
      U,
      [...Iterator, 1],
      T[Iterator["length"]] extends undefined
        ? ["0", ...TResult]
        : [...TResult, T[Iterator["length"]]],
      U[Iterator["length"]] extends undefined
        ? ["0", ...UResult]
        : [...UResult, U[Iterator["length"]]]
    >;

type PadArraysTest1 = PadArrays<["1", "1", "0"], ["1", "0"]>;
type PadArraysTest2 = PadArrays<["1", "1", "0"], []>;
type PadArraysTest3 = PadArrays<[], ["1", "0"]>;
type PadArraysTest4 = PadArrays<["1", "2", "3"], ["1", "0"]>;

type XORArraysToStr<
  A1 extends string[],
  A2 extends string[],
  Iterator extends any[] = [],
  Result extends string = ""
> = undefined extends A1[Iterator["length"]] & A2[Iterator["length"]]
  ? Result
  : XORArraysToStr<
      A1,
      A2,
      [...Iterator, 1],
      `${Result}${`${A1[Iterator["length"]]}${A2[Iterator["length"]]}` extends `${Binary}${Binary}`
        ? XORLookup[`${A1[Iterator["length"]]}${A2[Iterator["length"]]}`]
        : never}`
    >;

type XORArraysToStrTest1 = XORArraysToStr<["0", "0", "1"], ["1", "0", "1"]>;

// ============= Your Code Here =============

type BitwiseXOR<
  S1 extends string,
  S2 extends string,
  A1 extends string[] = ConvertStrToArray<S1>,
  A2 extends string[] = ConvertStrToArray<S2>,
  Arrays extends [string[], string[]] = PadArrays<A1, A2>
> = XORArraysToStr<Arrays[0], Arrays[1]>;

type Test1 = BitwiseXOR<"10", "1">;
