import { Game } from '../domain/Game';
import { GameService } from '../domain/GameService';

export class MoveRight {
    private readonly gameService: GameService;

    constructor(gameService: GameService) {
        this.gameService = gameService;
    }

    execute(): Game {
        return this.gameService.moveRight();
    }
}
