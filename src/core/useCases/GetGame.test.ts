import { GameService } from '../domain/GameService';
import { GetGame } from './GetGame';
import { InMemoryGameService } from '../infrastructure/inMemory/InMemoryGameService';

describe('GetGame should', () => {
    it('retrieve a new default game', async () => {
        //when
        const game = await getGame().execute();
        // then
        expect(game.movesDone).toEqual(0);
        expect(game.movesLeft).toEqual(10);
        expect(game.status.valueOf()).toEqual('playing');
        expect(game.board.columns).toEqual(5);
        expect(game.board.rows).toEqual(5);
        expect(game.board.cells.length).toEqual(25);
        expect(game.chip.position.column).toEqual(0);
        expect(game.chip.position.row).toEqual(0);
    });

    beforeEach(() => {
        gameService = new InMemoryGameService();
    });

    function getGame(): GetGame {
        return new GetGame(gameService);
    }

    let gameService: GameService;
});
