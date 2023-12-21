export type Expect<T extends true> = T
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false

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
    ['⭕', '  ', '❌']
]

type GameInProgressBoard = [
    [TicTacToeCell, TicTacToeCell, TicTacToeCell],
    [TicTacToeCell, TicTacToeCell, TicTacToeCell],
    [TicTacToeCell, TicTacToeCell, TicTacToeCell]
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

type PlaceChipAtPosition<Board extends GameInProgressBoard,
    Positions extends TicTacToePositions,
    Coords extends GetCoords<Positions> = GetCoords<Positions>,
    Memory extends string[][] = []>
    = Memory['length'] extends Board['length']
    ? Memory
    : Coords['y'] extends Memory['length']
    ? PlaceChipAtPosition<Board, Positions, Coords, [...Memory, ['here']]>
    : PlaceChipAtPosition<Board, Positions, Coords, [...Memory, Board[Memory['length']]]>;


type TicTacToe<CurrentGame extends Game, Positions extends TicTacToePositions> = PlaceChipAtPosition<CurrentGame['board'], Positions>;

type TestTicTacToe1 = TicTacToe<TestGame1, 'bottom-right'>




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