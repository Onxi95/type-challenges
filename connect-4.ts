// Advent of TypeScript 2023
// https://typehero.dev/challenge/day-23

type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Transpose<T extends unknown[][], U = T["length"] extends 0 ? [] : T[0]> = {
  [X in keyof U]: {
    [Y in keyof T]: X extends keyof T[Y] ? T[Y][X] : never;
  };
};

type TransposeTest1 = Transpose<
  [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "🔴", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
  ]
>;

type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | "  ";
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type GameBoard = Connect4Cell[][];

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

type EmptyBoard1 = [
  ["  ", "  ",],
  ["🔴", "  ",],
  ["🟡", "  ",]
  // ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  // ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  // ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

type Game = {
  board: GameBoard;
  state: Connect4Chips;
};

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type NewGame1 = {
  board: EmptyBoard1,
  state: "🟡";
}

type PlaceChipAtEndIfEmpty<
  Row extends Connect4Cell[],
  Chip extends Connect4Chips
> = Row extends [...infer First, infer Last]
  ? Last extends "  "
    ? [...First, Chip]
    : [...First, Last]
  : never;

type PlaceChipAtEnd<
  Row extends Connect4Cell[],
  Chip extends Connect4Chips,
  Memory extends Connect4Cell[] = []
> = Row extends [
  infer First extends Connect4Cell,
  ...infer Rest extends Connect4Cell[]
]
  ? Rest[0] extends Connect4Chips
    ? [...Memory, Chip, ...Rest]
    : PlaceChipAtEnd<Rest, Chip, [...Memory, First]>
  : PlaceChipAtEndIfEmpty<Memory, Chip>;

type FlipGameState<CurrentState extends Connect4Chips> =
  CurrentState extends "🟡" ? "🔴" : "🟡";

type PlaceChipAtEndTest1 = PlaceChipAtEnd<
  ["  ", "  ", "  ", "  ", "  ", "  "],
  "🟡"
>;
type PlaceChipAtEndTest2 = PlaceChipAtEnd<
  ["  ", "  ", "  ", "🔴", "🟡", "🔴"],
  "🟡"
>;

type FillChipInColumn<
  Board extends GameBoard,
  Column extends number,
  Chip extends Connect4Chips,
  TransposedBoard extends Transpose<Board> = Transpose<Board>,
  Memory extends GameBoard = []
> = Memory["length"] extends TransposedBoard["length"]
  ? Transpose<Memory>
  : Column extends Memory["length"]
  ? FillChipInColumn<
      Board,
      Column,
      Chip,
      TransposedBoard,
      [...Memory, PlaceChipAtEnd<TransposedBoard[Memory["length"]], Chip>]
    >
  : FillChipInColumn<
      Board,
      Column,
      Chip,
      TransposedBoard,
      [...Memory, TransposedBoard[Memory["length"]]]
    >;

type CheckRowWin<
  Row extends Connect4Cell[],
  CurrentChip extends Connect4Cell = Row[0],
  Count extends any[] = []
> = Count['length'] extends 4 ? CurrentChip :
  Row extends [infer First extends Connect4Cell, ...infer Rest extends Connect4Cell[]]
  ? First extends CurrentChip
  ? CheckRowWin<Rest, First, [...Count, First]>
  : CheckRowWin<Rest, First, [First]>
  : void;

type CheckRowWinTest1 = CheckRowWin<["🔴", "🔴", "🔴", "🔴", "  ", "  ", "  "]>
type CheckRowWinTest2 = CheckRowWin<["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "]>
type CheckRowWinTest3 = CheckRowWin<["  ", "  ", "🟡", "🟡", "🟡", "🟡", "  "]>
type CheckRowWinTest4 = CheckRowWin<["  ", "  ", "  ", "🟡", "🟡", "🟡", "🟡"]>
type CheckRowWinTest5 = CheckRowWin<["🟡", "🟡", "🔴", "🔴", "🔴", "🔴", "🟡"]>

type CheckHorizontalWin<CurrentBoard extends GameBoard> =
 CurrentBoard extends [infer First extends Connect4Cell[], ...infer Rest extends Connect4Cell[][]]
  ? CheckRowWin<First> extends Connect4Chips
  ? `${CheckRowWin<First>} Won`
  : CheckHorizontalWin<Rest>
  : void;

type CheckHorizontalWinTest1 = CheckHorizontalWin<[
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ["🔴", "🔴", "🔴", "🔴", "  ", "  ", "  "],
  ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
]>

type CheckHorizontalWinTest2 = CheckHorizontalWin<[
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["🟡", "  ", "  ", "🔴", "🔴", "🔴", "🔴"],
  ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ["🟡", "🔴", "🔴", "🔴", "  ", "  ", "  "],
  ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
]>

type CheckForWin<CurrentBoard extends GameBoard, Transposed extends GameBoard = Transpose<GameBoard>> =
  CheckHorizontalWin<CurrentBoard> extends string
  ? CheckHorizontalWin<CurrentBoard>
  : CheckHorizontalWin<Transposed> extends string
  ? CheckHorizontalWin<Transposed>
  : void;



type CheckRowsForDraw<Board extends GameBoard> =
  Board extends [infer First extends Connect4Cell[], ...infer Rest extends Connect4Cell[][]]
  ? "  " extends First[number] ? void
  : CheckRowsForDraw<Rest>
  : 'Draw'

type CalculateState<CurrentBoard, CurrentState extends Connect4Chips> = 
CurrentBoard extends GameBoard
  ? CheckForWin<CurrentBoard> extends string
  ? CheckForWin<CurrentBoard> 
  : CheckForDraw<CurrentBoard> extends string
  ? CheckForDraw<CurrentBoard> 
  : FlipGameState<CurrentState>
  : never;

type Connect4<CurrentGame extends Game, Column extends number, NextBoard = FillChipInColumn<CurrentGame["board"], Column, CurrentGame["state"]>> = {
  board: NextBoard;
  state: CalculateState<NextBoard, CurrentGame['state']>;
};

type Connect4Test1 = Connect4<NewGame1, 0>;
type Connect4Test2 = Connect4<
  {
    board: [
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "🔴", "🔴", "  ", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🔴";
  },
  3
>['state'];

type test_move1_actual = Connect4<NewGame, 0>;
//   ^?
type test_move1_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🔴";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = Connect4<test_move1_actual, 0>;
//   ^?
type test_move2_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🟡";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = Connect4<test_move2_actual, 0>;
//   ^?
type test_move3_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🔴";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = Connect4<test_move3_actual, 1>;
//   ^?
type test_move4_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🟡";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_move5_actual = Connect4<test_move4_actual, 2>;
//   ^?
type test_move5_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "]
  ];
  state: "🔴";
};
type test_move5 = Expect<Equal<test_move5_actual, test_move5_expected>>;

type test_move6_actual = Connect4<test_move5_actual, 1>;
//   ^?
type test_move6_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🔴", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "]
  ];
  state: "🟡";
};
type test_move6 = Expect<Equal<test_move6_actual, test_move6_expected>>;

type test_red_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "🔴", "🔴", "  ", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🔴";
  },
  3
>;

type test_red_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🔴", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
  ];
  state: "🔴 Won";
};

type test_red_win = Expect<Equal<test_red_win_actual, test_red_win_expected>>;

type test_yellow_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
      ["🟡", "  ", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🟡";
  },
  1
>;

type test_yellow_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🟡", "🟡", "🟡", "  ", "  ", "  "]
  ];
  state: "🟡 Won";
};

type test_yellow_win = Expect<
  Equal<test_yellow_win_actual, test_yellow_win_expected>
>;

type test_diagonal_yellow_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
      ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🟡";
  },
  3
>;

type test_diagonal_yellow_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "🟡", "  ", "  ", "  "],
    ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
    ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
  ];
  state: "🟡 Won";
};

type test_diagonal_yellow_win = Expect<
  Equal<test_diagonal_yellow_win_actual, test_diagonal_yellow_win_expected>
>;

type test_draw_actual = Connect4<
  {
    board: [
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "  "],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"]
    ];
    state: "🟡";
  },
  6
>;

type test_draw_expected = {
  board: [
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"]
  ];
  state: "Draw";
};

type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
