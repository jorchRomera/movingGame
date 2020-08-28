import { Board } from '../domain/Board';
import { BoardGetter } from '../domain/BoardGetter';

export class GetBoard {
    private readonly boardGetter: BoardGetter;

    constructor(boardGetter: BoardGetter) {
        this.boardGetter = boardGetter;
    }

    execute(): Board {
        return this.boardGetter.get();
    }
}
