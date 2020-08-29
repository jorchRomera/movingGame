import { InMemoryGameService } from './infrastructure/inMemory/InMemoryGameService';
import { GetGame } from './useCases/GetGame';
import { MoveRight } from './useCases/MoveRight';
import { MoveLeft } from './useCases/MoveLeft';
import { MoveUp } from './useCases/MoveUp';
import { MoveDown } from './useCases/MoveDown';

export class Provider {
    static getGame() { return new GetGame(D.gameService()); }
    static moveRight() { return new MoveRight(D.gameService()); }
    static moveLeft() { return new MoveLeft(D.gameService()); }
    static moveUp() { return new MoveUp(D.gameService()); }
    static moveDown() { return new MoveDown(D.gameService()); }
}

class Dependencies {
    static gameService() { return this.singleton('gameService', () => new InMemoryGameService()); }

    static singleton<T>(name: string, build: () => T): T {
        if (!this._singleInstances[name]) {
            this._singleInstances[name] = build();
        }
        return this._singleInstances[name];
    }

    static _singleInstances: any = {};
}

const D = Dependencies;
