import { Board } from './Board';
import { Chip } from './Chip';

export interface Game {
    status: GameStatus;
    movesDone: number;
    movesLeft: number;
    board: Board;
    chip: Chip;
}

export enum GameStatus {
    playing = 'playing',
    win = 'win',
    lose = 'lose',
}
