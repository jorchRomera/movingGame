import { GetChip } from './useCases/GetChip';
import { InMemoryChipGetter } from './infrastructure/inMemory/InMemoryChipGetter';
import { InMemoryBoardGetter } from './infrastructure/inMemory/InMemoryBoardGetter';
import { GetBoard } from './useCases/GetBoard';

export class Provider {
    static getChip() { return new GetChip(D.chipGetter()); }

    static getBoard() { return new GetBoard(D.boardGetter()); }
}

class Dependencies {
    static chipGetter() { return this.singleton('chipGetter', () => new InMemoryChipGetter()); }

    static boardGetter() { return this.singleton('boardGetter', () => new InMemoryBoardGetter()); }

    static singleton<T>(name: string, build: () => T): T {
        if (!this._singleInstances[name]) {
            this._singleInstances[name] = build();
        }
        return this._singleInstances[name];
    }

    static _singleInstances: any = {};
}

const D = Dependencies;
