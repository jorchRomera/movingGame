import { GameService } from '../../domain/GameService';
import { Game, GameStatus } from '../../domain/Game';
import { Cell } from '../../domain/Cell';
import { defaultGame } from '../testing/fixtures/Games';

export class InMemoryGameService implements GameService {
    private game = defaultGame;

    get(): Game {
        return this.game;
    }

    moveRight(): Game {
        let { status } = this.game;
        if ( status === GameStatus.win || status === GameStatus.lose) return this.game;
        if (this.isRightOutOfBounds()) return this.game;
        const cellToMove = this.getRightCell();
        if (this.isCellBlocked(cellToMove)) return this.game;
        this.moveChipRight();
        this.game.movesDone += 1;
        this.game.movesLeft -= 1;
        if (this.isWinnerCell(cellToMove)) { this.win(); }
        if (this.game.movesLeft === 0) { this.lose();}
        return this.game;
    }

    moveLeft() {
        let { status } = this.game;
        if ( status === GameStatus.win || status === GameStatus.lose) return this.game;
        if (this.isLeftOutOfBounds()) return this.game;
        const cellToMove = this.getLeftCell();
        if (this.isCellBlocked(cellToMove)) return this.game;
        this.moveChipLeft();
        this.game.movesDone += 1;
        this.game.movesLeft -= 1;
        if (this.isWinnerCell(cellToMove)) { this.win(); }
        if (this.game.movesLeft === 0) { this.lose();}
        return this.game;
    }

    moveUp() {
        let { status } = this.game;
        if ( status === GameStatus.win || status === GameStatus.lose) return this.game;
        if (this.isUpOutOfBounds()) return this.game;
        const cellToMove = this.getUpCell();
        if (this.isCellBlocked(cellToMove)) return this.game;
        this.moveChipUp();
        this.game.movesDone += 1;
        this.game.movesLeft -= 1;
        if (this.isWinnerCell(cellToMove)) { this.win(); }
        if (this.game.movesLeft === 0) { this.lose();}
        return this.game;
    }

    moveDown() {
        let { status } = this.game;
        if ( status === GameStatus.win || status === GameStatus.lose) return this.game;
        if (this.isDownOutOfBounds()) return this.game;
        const cellToMove = this.getDownCell();
        if (this.isCellBlocked(cellToMove)) return this.game;
        this.moveChipDown();
        this.game.movesDone += 1;
        this.game.movesLeft -= 1;
        if (this.isWinnerCell(cellToMove)) { this.win(); }
        if (this.game.movesLeft === 0) { this.lose();}
        return this.game;
    }

    private isRightOutOfBounds(): boolean {
        return this.game.chip.position.column === this.game.board.rows -1
    }

    private isLeftOutOfBounds(): boolean {
        return this.game.chip.position.column === 0
    }

    private isUpOutOfBounds(): boolean {
        return this.game.chip.position.row === 0
    }

    private isDownOutOfBounds(): boolean {
        return this.game.chip.position.row === this.game.board.columns -1
    }

    private getRightCell(): Cell {
        const { row, column } = this.game.chip.position;
        return this.game.board.cells.find(cell => {
            return (column + 1) === cell.position.column && row === cell.position.row
        })!;
    }

    private getLeftCell(): Cell {
        const { row, column } = this.game.chip.position;
        return this.game.board.cells.find(cell => {
            return (column - 1) === cell.position.column && row === cell.position.row
        })!;
    }

    private getUpCell(): Cell {
        const { row, column } = this.game.chip.position;
        return this.game.board.cells.find(cell => {
            return column === cell.position.column && (row -1) === cell.position.row
        })!;
    }

    private getDownCell(): Cell {
        const { row, column } = this.game.chip.position;
        return this.game.board.cells.find(cell => {
            return column === cell.position.column && (row + 1) === cell.position.row
        })!;
    }

    private isCellBlocked = (cell: Cell): boolean => cell.type.valueOf() === 2;

    private moveChipRight() {
        this.game.chip.position.column += 1;
    }

    private moveChipLeft() {
        this.game.chip.position.column -= 1;
    }

    private moveChipUp() {
        this.game.chip.position.row -= 1;
    }

    private moveChipDown() {
        this.game.chip.position.row += 1;
    }

    private isWinnerCell = (cell: Cell): boolean => cell.type.valueOf() === 3;

    private win() {
        this.game.status = GameStatus.win;
    }

    private lose() {
        this.game.status = GameStatus.lose;
    }

}
