import { GameService } from '../domain/GameService';
import { InMemoryGameService } from '../infrastructure/inMemory/InMemoryGameService';
import { MoveRight } from './MoveRight';
import { MoveDown } from './MoveDown';

describe('MoveRight should', () => {
    it('move the chip right on a default game', async () => {
        // when
        const game = await moveRight().execute();
        //then
        expect(game.movesDone).toEqual(1);
        expect(game.movesLeft).toEqual(9);
        expect(game.chip.position.row).toEqual(0);
        expect(game.chip.position.column).toEqual(1);
    });

    it('not move if is in the edge of the board', async () => {
        // given
        await moveRight().execute();
        await moveRight().execute();
        await moveRight().execute();
        await moveRight().execute();
        //when
        const gameAfterFiveRightMoves = await moveRight().execute();
        //then
        expect(gameAfterFiveRightMoves.chip.position.column).toEqual(4);
        expect(gameAfterFiveRightMoves.chip.position.row).toEqual(0);
        expect(gameAfterFiveRightMoves.movesDone).toEqual(4);
    });

    it('not move to a blocked cell', async () => {
        //given
        await moveRight().execute();
        await moveRight().execute();
        await moveDown().execute();
        //when
        const gameAfterTryingToMoveRightToBlockedCell = await moveRight().execute();
        //then
        expect(gameAfterTryingToMoveRightToBlockedCell.chip.position.column).toEqual(2);
        expect(gameAfterTryingToMoveRightToBlockedCell.chip.position.row).toEqual(1);
        expect(gameAfterTryingToMoveRightToBlockedCell.movesDone).toEqual(3);
    });

    it('win if gets to the winner cell', async () => {
        //given
        await moveRight().execute();
        await moveRight().execute();
        await moveDown().execute();
        await moveDown().execute();
        await moveDown().execute();
        await moveDown().execute();
        await moveRight().execute();
        //when
        const gameAfterTryingToMoveRightToWinnerCell = await moveRight().execute();
        //then
        expect(gameAfterTryingToMoveRightToWinnerCell.chip.position.column).toEqual(4);
        expect(gameAfterTryingToMoveRightToWinnerCell.chip.position.row).toEqual(4);
        expect(gameAfterTryingToMoveRightToWinnerCell.movesDone).toEqual(8);
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
