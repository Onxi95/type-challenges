// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<
    Equal<
      CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">,
      "Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq"
    >
  >,
  Expect<Equal<CapitalizeWords<"">, "">>
];

// ============= Your Code Here =============
type CapitalizeWords<
  T extends string,
  Memory extends string = ""
> = T extends `${infer First}${infer Rest}`
  ? Uppercase<First> extends Lowercase<First>
    ? `${Capitalize<`${Memory}${First}`>}${CapitalizeWords<Rest>}`
    : CapitalizeWords<Rest, `${Memory}${First}`>
  : Capitalize<Memory>;
