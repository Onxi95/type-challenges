// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
    Expect<
        Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
    >,
    Expect<
        Equal<
            FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
            (arg0: boolean, arg1: number, arg2: string) => void
        >
    >
];

// ============= Your Code Here =============
type ReverseArray<T, U extends unknown[] = []> = T extends [
    ...infer First,
    infer Last
]
    ? ReverseArray<First, [...U, Last]>
    : U;

type FlipArguments<T extends (...params: any[]) => any> = T extends (
    ...params: infer P
) => infer R
    ? P extends unknown[]
        ? (...params: ReverseArray<P>) => R
        : () => R
    : never;
