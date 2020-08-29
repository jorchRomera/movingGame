import { Game } from '../domain/Game';
import { GameService } from '../domain/GameService';

export class MoveDown {
    private readonly gameService: GameService;

    constructor(gameService: GameService) {
        this.gameService = gameService;
    }

    execute(): Game {
        return this.gameService.moveDown();
    }
}
