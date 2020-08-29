import { BoardVM } from './BoardVM';

export interface GameVM {
    status: string;
    movesDone: number;
    movesLeft: number;
    board: BoardVM;
    chipPosition: number[];
}
