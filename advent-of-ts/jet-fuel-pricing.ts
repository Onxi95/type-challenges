type StripDashes<T extends string> = T extends `${infer First}${infer Rest}`
  ? First extends "-"
    ? StripDashes<Rest>
    : T extends `${infer First}-`
    ? StripDashes<First>
    : T
  : T;

type CountDashes<
  T extends string,
  Total extends any[] = []
> = T extends `${infer First extends "-"}${infer Rest}`
  ? CountDashes<Rest, [...Total, 0]>
  : [Total["length"], ...ParseName<T>];

type ParseName<T extends string> = T extends `${infer First}-${infer Rest}`
  ? [First, ...CountDashes<`-${Rest}`>]
  : [T];

type ParseLists<T extends any[], Result extends any[] = []> = T extends [
  infer Count,
  infer Name,
  ...infer Rest
]
  ? ParseLists<Rest, [...Result, [Name, Count]]>
  : Result;

type GetRoute<T extends string> = T extends ""
  ? []
  : ParseLists<CountDashes<StripDashes<T>>>;

type Test1 = GetRoute<"--north_pole--b------c">;
type Test2 = GetRoute<"">;
type Test3 = GetRoute<"a-b--">;
type Test4 = StripDashes<"---a----b--c----">;
type Test5 = GetRoute<"🎅--🎄---🏠----🤶">;
