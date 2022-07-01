// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type cases = [
    Expect<
        Equal<
            TupleToObject<typeof tuple>,
            {
                tesla: "tesla";
                "model 3": "model 3";
                "model X": "model X";
                "model Y": "model Y";
            }
        >
    >
];

// ============= Your Code Here =============
type TupleToObject<T extends readonly any[]> = {
    [K in T[number]]: K;
};
