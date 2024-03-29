/* eslint-disable @typescript-eslint/no-unused-vars */
export type twoIds = '/admin/test/{id}/hello/{otherId}';
export type oneIdInside = '/admin/test/{id}/hello';
export type oneIdAtTheEnd = '/admin/test/hello/{id}';
export type oneIdAtTheBeginning = '{id}/admin/test/hello';
export type withoutId = '/admin/test/hello';

type InferRouteParamsFromString<T extends string> =
  T extends `${infer First}${`{${infer Param}}`}${infer Second}`
  ?
  | Param
  | InferRouteParamsFromString<First>
  | InferRouteParamsFromString<Second>
  : never;

type test1 = InferRouteParamsFromString<twoIds>;
type test2 = InferRouteParamsFromString<oneIdInside>;
type test3 = InferRouteParamsFromString<oneIdAtTheEnd>;
type test4 = InferRouteParamsFromString<withoutId>;
type test5 = InferRouteParamsFromString<oneIdAtTheBeginning>;

type ConvertUnionToObjectType<T extends string> = {
  [Key in T]: string | number;
};

type testConvertUnionToObjectType1 = ConvertUnionToObjectType<'hi' | 'hello'>;
type testConvertUnionToObjectType2 = ConvertUnionToObjectType<'hi'>;

type ReplaceRouteParamsBySlots<T extends string> = T extends `${infer First}${`{${infer _}}`}${infer Second}`
  ?
  `${ReplaceRouteParamsBySlots<First>}${string | number}${ReplaceRouteParamsBySlots<Second>}`
  : T;

type testReplaceRouteParamsBySlots1 = ReplaceRouteParamsBySlots<twoIds>
type testReplaceRouteParamsBySlots2 = ReplaceRouteParamsBySlots<oneIdInside>
type testReplaceRouteParamsBySlots3 = ReplaceRouteParamsBySlots<oneIdAtTheEnd>
type testReplaceRouteParamsBySlots4 = ReplaceRouteParamsBySlots<oneIdAtTheBeginning>
type testReplaceRouteParamsBySlots5 = ReplaceRouteParamsBySlots<withoutId>

type InferRouteType<
  T extends string,
  RouteParams extends string = InferRouteParamsFromString<T>
> = [RouteParams] extends [never]
  ? T
  : (params: ConvertUnionToObjectType<RouteParams>) => ReplaceRouteParamsBySlots<T>;

type test6 = InferRouteType<twoIds>;
type test7 = InferRouteType<oneIdInside>;
type test8 = InferRouteType<oneIdAtTheEnd>;
type test9 = InferRouteType<withoutId>;
type test10 = InferRouteType<oneIdAtTheBeginning>;

// TODO: add constraint so slot has at least 1 char length
const Test6: test6 = (params) => `/admin/test/${params.id}/hello/${params.otherId}`;
const Test7: test7 = ({ id }) => `/admin/test/${id}/hello`;
const Test8: test8 = ({ id }) => `/admin/test/hello/${id}`;
const Test9: test9 = '/admin/test/hello';
const Test10: test10 = ({ id }) => `${id}/admin/test/hello`;
