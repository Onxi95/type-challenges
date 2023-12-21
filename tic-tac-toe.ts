// Advent of TypeScript 2023
// https://typehero.dev/challenge/day-21

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false

type Includes<T, U> = U extends [infer First, ...infer Rest]
    ? Equal<First, T> extends true
    ? true
    : Includes<T, Rest>
    : false;

type Unique<T, U extends any[] = []> =
    T extends [infer First, ...infer Rest]
    ? Includes<First, U> extends true
    ? Unique<Rest, [...U]>
    : Unique<Rest, [...U, First]>
    : U

type Transpose<T extends unknown[][], U = T['length'] extends 0 ? [] : T[0]> = {
    [X in keyof U]: {
        [Y in keyof T]: X extends keyof T[Y] ? T[Y][X] : never
    }
}

type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeRow = TicTacToeCell[];
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
    board: TicTactToeBoard;
    state: TicTacToeState;
};

type EmptyBoard = [
    ['  ', '  ', '  '],
    ['  ', '  ', '  '],
    ['  ', '  ', '  ']
];

type TestBoard1 = [
    ['⭕', '❌', '  '],
    ['⭕', '❌', '  '],
    ['  ', '⭕', '  ']
]

type TestBoard2 = [
    ['⭕', '❌', '  '],
    ['⭕', '❌', '  '],
    ['⭕', '  ', '❌']
]

type TestBoard3 = [
    ['❌', '❌', '❌'],
    ['⭕', '❌', '  '],
    ['⭕', '  ', '❌']
]

type TestBoard4 = [
    ['⭕', '❌', '⭕'],
    ['⭕', '❌', '❌'],
    ['❌', '⭕', '⭕']
]

type TestBoard5 = [
    ['⭕', '❌', '  '],
    ['  ', '❌', '  '],
    ['⭕', '❌', '  ']
]

type Row = [TicTacToeCell, TicTacToeCell, TicTacToeCell]

type GameInProgressBoard = [
    Row, Row, Row,
]

type Game = {
    board: GameInProgressBoard,
    state: TicTacToeChip
}

type NewGame = {
    board: EmptyBoard;
    state: '❌';
};

type TestGame1 = {
    board: TestBoard1,
    state: '❌'
}


type CoordsMap = {
    top: 0,
    middle: 1,
    bottom: 2,
    left: 0,
    center: 1,
    right: 2,
}

type GetCoords<T extends TicTacToePositions> =
    T extends `${infer Vertical extends TicTacToeYPositions}-${infer Horizontal extends TicTacToeXPositions}`
    ? { y: CoordsMap[Vertical], x: CoordsMap[Horizontal] } : never;

type GetCoordsTest1 = GetCoords<'top-left'>
type GetCoordsTest2 = GetCoords<'bottom-center'>


type PlaceChipAtX<CurrentRow extends string[], X extends number, Chip extends TicTacToeChip, Memory extends string[] = []> =
    CurrentRow extends [infer First extends TicTacToeCell, ...infer Rest extends string[]]
    ? Memory['length'] extends X ? PlaceChipAtX<Rest, X, Chip, [...Memory, Chip]> : PlaceChipAtX<Rest, X, Chip, [...Memory, First]>
    : Memory

type PlaceChipAtPosition<Board extends GameInProgressBoard,
    Positions extends TicTacToePositions,
    Chip extends TicTacToeChip,
    Coords extends GetCoords<Positions> = GetCoords<Positions>,
    Memory extends string[][] = []>
    = Memory['length'] extends Board['length']
    ? Memory
    : Coords['y'] extends Memory['length']
    ? PlaceChipAtPosition<Board, Positions, Chip, Coords, [...Memory, PlaceChipAtX<Board[Memory['length']], Coords['x'], Chip>]>
    : PlaceChipAtPosition<Board, Positions, Chip, Coords, [...Memory, Board[Memory['length']]]>;

type CanPlaceChipAtPosition<Board extends GameInProgressBoard,
    Positions extends TicTacToePositions,
    Coords extends GetCoords<Positions> = GetCoords<Positions>>
    = Board[Coords['y']][Coords['x']] extends TicTacToeEmptyCell ? true : false;

type CanPlaceChipAtPositionTest1 = CanPlaceChipAtPosition<TestBoard4, 'bottom-left'>
type CanPlaceChipAtPositionTest2 = CanPlaceChipAtPosition<TestBoard5, 'bottom-right'>

type FlipGameState<CurrentState extends TicTacToeChip> = CurrentState extends '⭕' ? '❌' : '⭕';

type Test1FlipGameState = FlipGameState<'⭕'>
type Test2FlipGameState = FlipGameState<'❌'>
type Test3FlipGameState = FlipGameState<NewGame['state']>


type CheckRowsWin<Board> =
    Board extends [infer First extends TicTacToeCell[], ...infer Rest extends TicTacToeCell[][]]
    ? First[number] extends "  " ? CheckRowsWin<Rest>
    : Unique<First>['length'] extends 1 ? `${First[0]} Won` : CheckRowsWin<Rest>
    : void

type CheckRowsForDraw<Board> =
    Board extends [infer First extends TicTacToeCell[], ...infer Rest extends TicTacToeCell[][]]
    ? "  " extends First[number] ? void
    : CheckRowsForDraw<Rest>
    : 'Draw'

type Test1CheckRowsForDraw = CheckRowsForDraw<TestBoard4>
type Test2CheckRowsForDraw = CheckRowsForDraw<TestBoard3>

type CheckWin<Board extends GameInProgressBoard> = CheckRowsWin<Board>;

// ['⭕', '❌', '  '],
// ['⭕', '❌', '  '],
// ['⭕', '  ', '❌']
type TransposeTest1 = Transpose<TestBoard2>

// ['❌', '❌', '❌'],
// ['⭕', '❌', '  '],
// ['⭕', '  ', '❌']
type TransposeTest2 = Transpose<TestBoard3>

// ['⭕', '❌', '  '],
// ['  ', '❌', '  '],
// ['⭕', '❌', '  ']
type TransposeTest3 = Transpose<TestBoard5>

type Test1CheckWin = CheckWin<TestBoard3>
type Test2CheckWin = CheckWin<TestBoard2>

type CheckForWin<CurrentGame> = CurrentGame extends string[][] ? CheckRowsWin<Transpose<CurrentGame>> : never;
type CheckForDraw<CurrentGame> = CurrentGame extends string[][]
    ? CheckRowsForDraw<CurrentGame>
    : void

type CheckForWinTest1 = CheckForWin<TestBoard5>

type CalculateState<Result, GameState extends Game['state']> =
    CheckForWin<Result> extends string
    ? CheckForWin<Result>
    : CheckForDraw<Result> extends string
    ? CheckForDraw<Result>
    : FlipGameState<GameState>

type TicTacToe<
    CurrentGame extends Game,
    Positions extends TicTacToePositions,
    Result extends PlaceChipAtPosition<CurrentGame['board'], Positions, CurrentGame['state']>
    = PlaceChipAtPosition<CurrentGame['board'], Positions, CurrentGame['state']>> =
    CanPlaceChipAtPosition<CurrentGame['board'], Positions> extends true ?
    {
        board: Result,
        state: CalculateState<Result, CurrentGame['state']>
    }
    : CurrentGame

//     ['⭕', '❌', '  '],
//     ['⭕', '❌', '  '],
//     ['  ', '⭕', '  ']


type TestTicTacToe1 = TicTacToe<{
    board: [
        ['⭕', '❌', '  '],
        ['  ', '❌', '  '],
        ['  ', '  ', '  ']
    ];
    state: '⭕';
}, 'bottom-left'>

type TestTicTacToe2 = TicTacToe<{
    board: [
        ['⭕', '❌', '  '],
        ['  ', '❌', '  '],
        ['⭕', '  ', '  ']
    ];
    state: '❌';
}, 'bottom-center'>


type TestTicTacToe3 = TicTacToe<{
    board: [
        ['  ', '❌', '  '],
        ['  ', '  ', '  '],
        ['  ', '  ', '  ']
    ];
    state: '⭕';
}, 'top-center'>


type test_move1_actual = TicTacToe<NewGame, 'top-center'>;
//   ^?
type test_move1_expected = {
    board: [
        ['  ', '❌', '  '],
        ['  ', '  ', '  '],
        ['  ', '  ', '  ']
    ];
    state: '⭕';
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, 'top-left'>;
//   ^?
type test_move2_expected = {
    board: [
        ['⭕', '❌', '  '],
        ['  ', '  ', '  '],
        ['  ', '  ', '  ']];
    state: '❌';
}
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, 'middle-center'>;
//   ^?
type test_move3_expected = {
    board: [
        ['⭕', '❌', '  '],
        ['  ', '❌', '  '],
        ['  ', '  ', '  ']
    ];
    state: '⭕';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, 'bottom-left'>;
//   ^?
type test_move4_expected = {
    board: [
        ['⭕', '❌', '  '],
        ['  ', '❌', '  '],
        ['⭕', '  ', '  ']
    ];
    state: '❌';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;


type test_x_win_actual = TicTacToe<test_move4_actual, 'bottom-center'>;
//   ^?
type test_x_win_expected = {
    board: [
        ['⭕', '❌', '  '],
        ['  ', '❌', '  '],
        ['⭕', '❌', '  ']
    ];
    state: '❌ Won';
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, 'bottom-right'>;
//   ^?
type type_move5_expected = {
    board: [
        ['⭕', '❌', '  '],
        ['  ', '❌', '  '],
        ['⭕', '  ', '❌']
    ];
    state: '⭕';
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, 'middle-left'>;
//   ^?
type test_o_win_expected = {
    board: [
        ['⭕', '❌', '  '],
        ['⭕', '❌', '  '],
        ['⭕', '  ', '❌']
    ];
    state: '⭕ Won';
};

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, 'top-center'>;
//   ^?
type test_invalid_expected = {
    board: [
        ['  ', '❌', '  '],
        ['  ', '  ', '  '],
        ['  ', '  ', '  ']
    ];
    state: '⭕';
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
    board: [
        ['⭕', '❌', '⭕'],
        ['⭕', '❌', '❌'],
        ['❌', '⭕', '  ']];
    state: '⭕';
}
type test_draw_actual = TicTacToe<test_before_draw, 'bottom-right'>;
//   ^?
type test_draw_expected = {
    board: [
        ['⭕', '❌', '⭕'],
        ['⭕', '❌', '❌'],
        ['❌', '⭕', '⭕']];
    state: 'Draw';
}
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;