import { Board } from './Board';
import { Chip } from './Chip';

export interface Game {
    gameStatus: GameStatus;
    movesDone: number;
    movesLeft: number;
    board: Board;
    chip: Chip;
}

enum GameStatus {
    playing = 'playing',
    win = 'win',
    lose = 'lose',
}
