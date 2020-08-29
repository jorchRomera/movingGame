import { GameService } from '../domain/GameService';
import { InMemoryGameService } from '../infrastructure/inMemory/InMemoryGameService';
import { MoveRight } from './MoveRight';
import { MoveDown } from './MoveDown';
import { MoveLeft } from './MoveLeft';

describe('MoveLeft should', () => {
    it('move the chip left', async () => {
        //given
        await moveRight().execute();
        //when
        const gameAfterMoveRight = await moveLeft().execute();
        //then
        expect(gameAfterMoveRight.movesDone).toEqual(2);
        expect(gameAfterMoveRight.movesLeft).toEqual(8);
        expect(gameAfterMoveRight.chip.position.row).toEqual(0);
        expect(gameAfterMoveRight.chip.position.column).toEqual(0);
    });

    it('not move if is in the edge of the board', async () => {
        //when
        const gameAfterTryingToMoveOutOfBounds = await moveLeft().execute();

        expect(gameAfterTryingToMoveOutOfBounds.chip.position.column).toEqual(0);
        expect(gameAfterTryingToMoveOutOfBounds.chip.position.row).toEqual(0);
        expect(gameAfterTryingToMoveOutOfBounds.movesDone).toEqual(0);
    });

    it('not move to a blocked cell', async () => {
        await moveRight().execute();
        await moveRight().execute();
        await moveDown().execute();
        const gameAfterTryingToMoveLeftToBlockedCell = await moveLeft().execute();

        expect(gameAfterTryingToMoveLeftToBlockedCell.chip.position.column).toEqual(2);
        expect(gameAfterTryingToMoveLeftToBlockedCell.chip.position.row).toEqual(1);
        expect(gameAfterTryingToMoveLeftToBlockedCell.movesDone).toEqual(3);
    });

    beforeEach(() => {
        gameService = new InMemoryGameService();
    });

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
