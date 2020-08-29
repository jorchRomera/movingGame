import { CellVM } from './CellVM';

export interface BoardVM {
    cells: CellVM[];
    columns: number;
}
