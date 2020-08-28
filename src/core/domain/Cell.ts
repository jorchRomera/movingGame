export interface Cell {
    position: CellPosition;
    type: CellType;
}

interface CellPosition {
    row: number;
    column: number;
}

enum CellType {
    starter = 0,
    normal = 1,
    blocked = 2,
    winner = 3,
}
