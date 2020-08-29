import { BoardVM } from './BoardVM';
import { CellVM } from './CellVM';
import { Cell } from '../../core/domain/Cell';
import { Game } from '../../core/domain/Game';
import { GetGame } from '../../core/useCases/GetGame';
import { GameVM } from './GameVM';
import { MoveRight } from '../../core/useCases/MoveRight';
import { MoveLeft } from '../../core/useCases/MoveLeft';
import { MoveUp } from '../../core/useCases/MoveUp';
import { MoveDown } from '../../core/useCases/MoveDown';

export interface GameView {
    updateBoard(board: BoardVM): void;
    updateGame(game: GameVM): void;
    updateChipPosition(chip: number[]): void;
    updateGameStatus(gameStatus: string): void;
    updateMoves(movesDone: number, movesLeft: number): void;
}

export class GamePresenter {
    private view: GameView;
    private readonly getGame: GetGame;
    private game: Game|null = null;
    private readonly moveChipRight: MoveRight;
    private readonly moveChipLeft: MoveLeft;
    private readonly moveChipUp: MoveUp;
    private readonly moveChipDown: MoveDown;

    constructor(
        view: GameView,
        getGame: GetGame,
        moveChipRight: MoveRight,
        moveChipLeft: MoveLeft,
        moveChipUp: MoveUp,
        moveChipDown: MoveDown
    ) {
        this.view = view;
        this.getGame = getGame;
        this.moveChipRight = moveChipRight;
        this.moveChipLeft = moveChipLeft;
        this.moveChipUp = moveChipUp;
        this.moveChipDown = moveChipDown;
    }

    async start() {
        this.initializeGame()
    }

    private initializeGame() {
        this.game = this.getGame.execute();
        this.view.updateGame(this.gameToViewModel());
    }

    private gameToViewModel(): GameVM {
        const { status, movesDone, movesLeft, board: { cells, columns }, chip: { position: { row, column }} } = this.game!;
        return {
            status: status.valueOf(),
            movesDone: movesDone,
            movesLeft: movesLeft,
            board: {
                columns: columns,
                cells: cells.map(cell => this.cellsToViewModel(cell)),
            },
            chipPosition: [row, column],
        }
    }

    private cellsToViewModel = (cell: Cell): CellVM => {
        const { position: { row, column }, type} = cell;
        return  { position: [ row, column ], type: type.valueOf() };
    };

    moveRight() {
        this.game = this.moveChipRight.execute();
        this.view.updateGame(this.gameToViewModel());
    }

    moveLeft() {
        this.game = this.moveChipLeft.execute();
        this.view.updateGame(this.gameToViewModel());
    }

    moveUp() {
        this.game = this.moveChipUp.execute();
        this.view.updateGame(this.gameToViewModel());
    }

    moveDown() {
        this.game = this.moveChipDown.execute();
        this.view.updateGame(this.gameToViewModel());
    }
}
