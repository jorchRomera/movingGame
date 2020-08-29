import { GameService } from '../domain/GameService';
import { InMemoryGameService } from '../infrastructure/inMemory/InMemoryGameService';
import { MoveRight } from './MoveRight';
import { MoveDown } from './MoveDown';
import { MoveLeft } from './MoveLeft';
import { MoveUp } from './MoveUp';

describe('MoveUp should', () => {
    it('move the chip up', async () => {
        //given
        await moveRight().execute();
        await moveRight().execute();
        await moveDown().execute();
        //when
        const gameAfterMoveUp = await moveUp().execute();
        //then
        expect(gameAfterMoveUp.movesDone).toEqual(4);
        expect(gameAfterMoveUp.movesLeft).toEqual(6);
        expect(gameAfterMoveUp.chip.position.row).toEqual(0);
        expect(gameAfterMoveUp.chip.position.column).toEqual(2);
    });

    it('not move if is in the edge of the board', async () => {
        //when
        const gameAfterTryingToMoveOutOfBounds = await moveUp().execute();
        //then
        expect(gameAfterTryingToMoveOutOfBounds.chip.position.column).toEqual(0);
        expect(gameAfterTryingToMoveOutOfBounds.chip.position.row).toEqual(0);
        expect(gameAfterTryingToMoveOutOfBounds.movesDone).toEqual(0);
    });

    it('not move to a blocked cell', async () => {
        //given
        await moveRight().execute();
        await moveRight().execute();
        await moveDown().execute();
        await moveDown().execute();
        await moveDown().execute();
        await moveLeft().execute();
        //when
        const gameAfterTryingToMoveUpToBlockedCell = await moveUp().execute();
        //then
        expect(gameAfterTryingToMoveUpToBlockedCell.chip.position.column).toEqual(1);
        expect(gameAfterTryingToMoveUpToBlockedCell.chip.position.row).toEqual(3);
        expect(gameAfterTryingToMoveUpToBlockedCell.movesDone).toEqual(6);
    });

    beforeEach(() => {
        gameService = new InMemoryGameService();
    });

    function moveUp(): MoveUp {
        return new MoveUp(gameService);
    }

    function moveLeft(): MoveLeft {
        return new MoveLeft(gameService);
    }

    function moveRight(): MoveRight {
        return new MoveRight(gameService);
    }
    function moveDown(): MoveDown {
        return new MoveDown(gameService);
    }

    let gameService: GameService;
});
