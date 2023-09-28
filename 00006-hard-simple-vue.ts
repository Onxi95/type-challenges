// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.amount);
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});

// ============= Your Code Here =============
type InferReturnTypesFromComputed<T> = T extends Record<
  string,
  (...args: any[]) => any
>
  ? { [Key in keyof T]: ReturnType<T[Key]> }
  : never;

declare function SimpleVue<Data, Computed, Methods>(
  options: ThisType<Data & Methods & InferReturnTypesFromComputed<Computed>> & {
    data: (this: never) => Data;
    computed: Computed;
    methods: Methods;
  }
): any;
