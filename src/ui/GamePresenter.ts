import { Chip } from '../core/domain/Chip';
import { GetChip } from '../core/useCases/GetChip';
import { Board } from '../core/domain/Board';
import { GetBoard } from '../core/useCases/GetBoard';
import { BoardVM } from './BoardVM';
import { CellVM } from './CellVM';
import { Cell } from '../core/domain/Cell';
import { Game } from '../core/domain/Game';

export interface GameView {
    updateBoard(board: BoardVM): void;
    updateChipPosition(chip: number[]): void;
    updateGameStatus(gameStatus: string): void;
    updateMoves(movesDone: number, movesLeft: number): void;
}

export class GamePresenter {
    private view: GameView;
    private readonly getBoard: GetBoard;
    private readonly getChip: GetChip;
    private board: Board|null = null;
    private chip: Chip|null = null;
    private game: Game|null = null;
    private gameStatus = 'playing';
    private movesDone = 0;
    private movesLeft = 10;

    constructor(view: GameView, getBoard: GetBoard, getChip: GetChip) {
        this.view = view;
        this.getBoard = getBoard;
        this.getChip = getChip;
    }

    async start() {
        this.initializeBoard();
        this.initializeChip();
        this.initializeGameStatus();
    }

    private initializeBoard() {
        this.board = this.getBoard.execute();
        this.view.updateBoard(this.boardToViewModel());
    }

    private boardToViewModel(): BoardVM {
        const { cells } = this.board!;
        const cellsVM = cells.map(cell => this.cellsToViewModel(cell));
        return { cells: cellsVM };
    }

    private cellsToViewModel = (cell: Cell): CellVM => {
        const { position: { row, column }, type} = cell;
        return  { position: [ row, column ], type: type.valueOf() };
    };

    private initializeChip() {
        this.chip = this.getChip.execute();
        this.view.updateChipPosition(this.chipToViewModel());
    }

    private chipToViewModel(): number[] {
        const {row, column} = this.chip!.position;
        return [row, column];
    }

    private initializeGameStatus() {
        this.view.updateGameStatus(this.gameStatus);
    }

    moveRight() {
        if ( this.gameStatus === 'win' || this.gameStatus === 'lose') return;
        if (this.isRightOutOfBounds()) return;
        const cellToMove = this.getRightCell()!;
        if (this.isCellBlocked(cellToMove)) return;
        this.moveChipRight();
        this.view.updateChipPosition(this.chipToViewModel());
        this.view.updateMoves(++this.movesDone, --this.movesLeft);
        if (this.isWinnerCell(cellToMove)) { return this.win(); }
        if (this.movesLeft === 0) { this.lose();}
    }

    private isRightOutOfBounds(): boolean {
        return this.chip!.position.column === this.board!.rows -1
    }

    private getRightCell(): Cell {
        const { row, column } = this.chip!.position;
        return this.board!.cells.find(cell => {
            return (column + 1) === cell.position.column && row === cell.position.row
        })!;
    }

    private isCellBlocked = (cell: Cell): boolean => cell.type.valueOf() === 2;

    private moveChipRight() {
        this.chip!.position.column += 1;
    }

    private isWinnerCell = (cell: Cell): boolean => cell.type.valueOf() === 3;

    moveLeft() {
        if ( this.gameStatus === 'win' || this.gameStatus === 'lose') return;
        if (this.isLeftOutOfBounds()) return;
        const cellToMove = this.getLeftCell()!;
        if (this.isCellBlocked(this.getLeftCell()!)) return;
        this.moveChipLeft();
        this.view.updateChipPosition(this.chipToViewModel());
        this.view.updateMoves(++this.movesDone, --this.movesLeft);
        if (this.isWinnerCell(cellToMove)) { return this.win(); }
        if (this.movesLeft === 0) { this.lose();}
    }

    private isLeftOutOfBounds(): boolean {
        return this.chip!.position.column === 0
    }

    private getLeftCell(): Cell {
        const { row, column } = this.chip!.position;
        return this.board!.cells.find(cell => {
            return (column - 1) === cell.position.column && row === cell.position.row
        })!;
    }

    private moveChipLeft() {
        this.chip!.position.column -= 1;
    }

    moveUp() {
        if ( this.gameStatus === 'win' || this.gameStatus === 'lose') return;
        if (this.isUpOutOfBounds()) return;
        const cellToMove = this.getUpCell()!;
        if (this.isCellBlocked(this.getUpCell()!)) return;
        this.moveChipUp();
        this.view.updateChipPosition(this.chipToViewModel());
        this.view.updateMoves(++this.movesDone, --this.movesLeft);
        if (this.isWinnerCell(cellToMove)) { return this.win(); }
        if (this.movesLeft === 0) { this.lose();}
    }

    private isUpOutOfBounds(): boolean {
        return this.chip!.position.row === 0
    }

    private getUpCell(): Cell {
        const { row, column } = this.chip!.position;
        return this.board!.cells.find(cell => {
            return column === cell.position.column && (row -1) === cell.position.row
        })!;
    }

    private moveChipUp() {
        this.chip!.position.row -= 1;
    }

    moveDown() {
        if ( this.gameStatus === 'win' || this.gameStatus === 'lose') return;
        if (this.isDownOutOfBounds()) return;
        const cellToMove = this.getDownCell()!;
        if (this.isCellBlocked(this.getDownCell()!)) return;
        this.moveChipDown();
        this.view.updateChipPosition(this.chipToViewModel());
        this.view.updateMoves(++this.movesDone, --this.movesLeft);
        if (this.isWinnerCell(cellToMove)) { return this.win(); }
        if (this.movesLeft === 0) { this.lose();}
    }

    private isDownOutOfBounds(): boolean {
        return this.chip!.position.row === this.board!.columns -1
    }

    private getDownCell(): Cell {
        const { row, column } = this.chip!.position;
        return this.board!.cells.find(cell => {
            return column === cell.position.column && (row + 1) === cell.position.row
        })!;
    }

    private moveChipDown() {
        this.chip!.position.row += 1;
    }

    private win() {
        this.gameStatus = 'win';
        this.view.updateGameStatus(this.gameStatus);
    }

    private lose() {
        this.gameStatus = 'lose';
        this.view.updateGameStatus(this.gameStatus);
    }
}
