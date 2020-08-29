import { GameService } from '../domain/GameService';
import { InMemoryGameService } from '../infrastructure/inMemory/InMemoryGameService';
import { MoveRight } from './MoveRight';
import { MoveDown } from './MoveDown';

describe('MoveDown should', () => {
    it('move the chip down', async () => {
        //given
        await moveRight().execute();
        await moveRight().execute();
        //when
        const gameAfterMoveUp = await moveDown().execute();
        //then
        expect(gameAfterMoveUp.movesDone).toEqual(3);
        expect(gameAfterMoveUp.movesLeft).toEqual(7);
        expect(gameAfterMoveUp.chip.position.row).toEqual(1);
        expect(gameAfterMoveUp.chip.position.column).toEqual(2);
    });

    it('not move if is in the edge of the board', async () => {
        //given
        await moveRight().execute();
        await moveRight().execute();
        await moveDown().execute();
        await moveDown().execute();
        await moveDown().execute();
        await moveDown().execute();
        //when
        const gameAfterTryingToMoveOutOfBounds = await moveDown().execute();
        //then
        expect(gameAfterTryingToMoveOutOfBounds.chip.position.column).toEqual(2);
        expect(gameAfterTryingToMoveOutOfBounds.chip.position.row).toEqual(4);
        expect(gameAfterTryingToMoveOutOfBounds.movesDone).toEqual(6);
    });

    it('not move to a blocked cell', async () => {
        //when
        const gameAfterTryingToMoveDownToBlockedCell = await moveDown().execute();
        //then
        expect(gameAfterTryingToMoveDownToBlockedCell.chip.position.column).toEqual(0);
        expect(gameAfterTryingToMoveDownToBlockedCell.chip.position.row).toEqual(0);
        expect(gameAfterTryingToMoveDownToBlockedCell.movesDone).toEqual(0);
    });

    beforeEach(() => {
        gameService = new InMemoryGameService();
    });

    function moveRight(): MoveRight {
        return new MoveRight(gameService);
    }
    function moveDown(): MoveDown {
        return new MoveDown(gameService);
    }

    let gameService: GameService;
});
