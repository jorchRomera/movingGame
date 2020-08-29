import { Game } from './Game';

export interface GameService {
    get(): Game;
    moveRight(): Game;
    moveLeft(): Game;
    moveUp(): Game;
    moveDown(): Game;
}
