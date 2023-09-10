// ============= Test Cases =============
import type { Equal, Expect, ExpectExtends } from "./test-utils";

const ref = {
  count: 1,
  person: {
    name: "cattchen",
    age: 22,
    books: ["book1", "book2"],
    pets: [
      {
        type: "cat",
      },
    ],
  },
};

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, "name" | "age">>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number;
        person: { name: string; age: number };
      }>,
      "refCount" | "person" | "person.name" | "person.age"
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "count">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.name">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.age">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.0">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.1">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books[0]">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.[0]">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets.0.type">>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "notExist">, false>>,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.notExist">, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.name.">, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, ".person.name">, false>
  >,
  Expect<
    Equal<
      ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets.[0]type">,
      false
    >
  >
];

// ============= Your Code Here =============

type GenerateRangeFromArray<T extends any[] | readonly any[]> = T extends [
  infer First,
  ...infer Rest
]
  ? GenerateRangeFromArray<Rest> | Rest["length"]
  : never;

type ConnectKeysByDots<T> = T extends Record<string, unknown>
  ? {
      [Key in keyof T]: Key extends string
        ? T[Key] extends Record<string, unknown>
          ? Key | `${Key}.${ConnectKeysByDots<T[Key]>}`
          : T[Key] extends any[] | readonly any[]
          ? Key | `${Key}.${GenerateRangeFromArray<T[Key]>}`
          : Key
        : never;
    }[keyof T]
  : never;

type ObjectKeyPaths<T extends object> = ConnectKeysByDots<T>;

type test1 = ObjectKeyPaths<{
  count: 1;
  person: {
    name: "cattchen";
    age: 22;
    books: ["book1", "book2"];
    pets: [
      {
        type: "cat";
      }
    ];
  };
}>;
type test2 = ObjectKeyPaths<typeof ref>;
type test3 = (typeof ref)["person"]["books"];

type testConnectKeyByDots1 = ConnectKeysByDots<typeof ref>;
type testGenerateRangeFromArray1 = GenerateRangeFromArray<
  ["a", "b", "c", "d", "e"]
>;
