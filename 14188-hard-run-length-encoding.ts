// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<"AAABCCXXXXXXY">, "3AB2C6XY">>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<"3AB2C6XY">, "AAABCCXXXXXXY">>
];

// ============= Your Code Here =============

type AccumulatorType = { current: string; count: any[]; result: string };

type ConcatValuesFromAccumulator<T extends AccumulatorType> =
  `${T["result"]}${T["count"]["length"] extends 0 | 1
    ? ""
    : T["count"]["length"]}${T["current"]}`;

type RepeatToLength<
  Letter extends string,
  NumberAsString extends string,
  Result extends string = "",
  Counter extends any[] = []
> = NumberAsString extends `${Counter["length"]}`
  ? Result
  : RepeatToLength<
      Letter,
      NumberAsString,
      `${Letter}${Result}`,
      [...Counter, any]
    >;

type testRepeatToLength1 = RepeatToLength<"A", "3">;

// TODO: analyse what it does :P
// https://github.com/type-challenges/type-challenges/issues/14254
type DecodeHelper<
  S extends string,
  L extends string = ""
> = S extends `${infer F}${infer R}`
  ? F extends `${number}`
    ? DecodeHelper<R, `${L}${F}`>
    : `${Repeat<F, L extends "" ? "1" : L>}${DecodeHelper<R, "">}`
  : "";
type Repeat<
  S extends string,
  L extends string,
  C extends 1[] = []
> = `${C["length"]}` extends L ? "" : `${S}${Repeat<S, L, [1, ...C]>}`;

namespace RLE {
  export type Encode<
    S extends string,
    Accumulator extends AccumulatorType = {
      current: "";
      count: [];
      result: "";
    }
  > = S extends `${infer First}${infer Rest}`
    ? Accumulator["current"] extends First
      ? RLE.Encode<
          Rest,
          {
            current: First;
            count: [...Accumulator["count"], any];
            result: Accumulator["result"];
          }
        >
      : RLE.Encode<
          Rest,
          {
            current: First;
            count: [any];
            result: ConcatValuesFromAccumulator<Accumulator>;
          }
        >
    : ConcatValuesFromAccumulator<Accumulator>;
  export type Decode<S extends string> = DecodeHelper<S>;
}

// 3AB2C6XY
type test1 = RLE.Encode<"AAABCCXXXXXXY">;
type test2 = RLE.Decode<"3AB2C6XY">;
