import { Cell } from './Cell';

export interface Board {
    rows: number;
    columns: number;
    cells: Cell[];
}
