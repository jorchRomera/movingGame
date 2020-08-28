import { BoardGetter } from '../../domain/BoardGetter';
import { Board } from '../../domain/Board';

export class InMemoryBoardGetter implements BoardGetter {
    get(): Board {
        return {
            rows: 5,
            columns: 5,
            cells: [
                { position: { row: 0, column: 0 }, type: 0 },
                { position: { row: 0, column: 1 }, type: 1 },
                { position: { row: 0, column: 2 }, type: 1 },
                { position: { row: 0, column: 3 }, type: 1 },
                { position: { row: 0, column: 4 }, type: 1 },
                { position: { row: 1, column: 0 }, type: 2 },
                { position: { row: 1, column: 1 }, type: 2 },
                { position: { row: 1, column: 2 }, type: 1 },
                { position: { row: 1, column: 3 }, type: 2 },
                { position: { row: 1, column: 4 }, type: 2 },
                { position: { row: 2, column: 0 }, type: 2 },
                { position: { row: 2, column: 1 }, type: 2 },
                { position: { row: 2, column: 2 }, type: 1 },
                { position: { row: 2, column: 3 }, type: 2 },
                { position: { row: 2, column: 4 }, type: 2 },
                { position: { row: 3, column: 0 }, type: 1 },
                { position: { row: 3, column: 1 }, type: 1 },
                { position: { row: 3, column: 2 }, type: 1 },
                { position: { row: 3, column: 3 }, type: 2 },
                { position: { row: 3, column: 4 }, type: 2 },
                { position: { row: 4, column: 0 }, type: 2 },
                { position: { row: 4, column: 1 }, type: 2 },
                { position: { row: 4, column: 2 }, type: 1 },
                { position: { row: 4, column: 3 }, type: 1 },
                { position: { row: 4, column: 4 }, type: 3 },
            ],
        }
    }
}
