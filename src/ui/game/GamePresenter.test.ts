import { anything, capture, instance, mock, verify, when } from 'ts-mockito';
import { GamePresenter, GameView } from './GamePresenter';
import { GetGame } from '../../core/useCases/GetGame';
import { MoveRight } from '../../core/useCases/MoveRight';
import { MoveLeft } from '../../core/useCases/MoveLeft';
import { MoveUp } from '../../core/useCases/MoveUp';
import { MoveDown } from '../../core/useCases/MoveDown';
import { defaultGame } from '../../core/infrastructure/testing/fixtures/Games';

describe('GamePresenter should', () => {
    it('present the game in the proper format', async () => {
        when(getGame.execute()).thenReturn(defaultGame);

        await presenter.start();

        verify(getGame.execute()).called();
        const [viewModel] = capture(view.updateGame).last();
        expect(viewModel.chipPosition[0]).toStrictEqual(defaultGame.chip.position.row);
        expect(viewModel.chipPosition[1]).toStrictEqual(defaultGame.chip.position.column);
        expect(viewModel.movesDone).toBe(defaultGame.movesDone);
        expect(viewModel.movesLeft).toBe(defaultGame.movesLeft);
        expect(viewModel.status).toBe(defaultGame.status.valueOf());
        expect(viewModel.board.cells.length).toBe(defaultGame.board.cells.length);
        expect(viewModel.board.columns).toBe(defaultGame.board.columns);
    });

    it('call move right and update the view with the result', async () => {
        when(moveRight.execute()).thenReturn(defaultGame);
        when(view.updateGame(anything())).thenResolve();

        await presenter.moveRight();

        verify(moveRight.execute()).called();
        verify(view.updateGame(anything())).called();
    });

    it('call move left and update the view with the result', async () => {
        when(moveLeft.execute()).thenReturn(defaultGame);
        when(view.updateGame(anything())).thenResolve();

        await presenter.moveLeft();

        verify(moveLeft.execute()).called();
        verify(view.updateGame(anything())).called();
    });

    it('call move up and update the view with the result', async () => {
        when(moveUp.execute()).thenReturn(defaultGame);
        when(view.updateGame(anything())).thenResolve();

        await presenter.moveUp();

        verify(moveUp.execute()).called();
        verify(view.updateGame(anything())).called();
    });

    it('call move down and update the view with the result', async () => {
        when(moveDown.execute()).thenReturn(defaultGame);
        when(view.updateGame(anything())).thenResolve();

        await presenter.moveDown();

        verify(moveDown.execute()).called();
        verify(view.updateGame(anything())).called();
    });

    beforeEach(() => {
        view = mock<GameView>();
        getGame = mock<GetGame>();
        moveRight = mock<MoveRight>();
        moveLeft = mock<MoveLeft>();
        moveUp = mock<MoveUp>();
        moveDown = mock<MoveDown>();
        presenter = gamePresenter();
        when(getGame.execute()).thenReturn(defaultGame);
    });

    function gamePresenter(): GamePresenter {
        return new GamePresenter(
            instance(view),
            instance(getGame),
            instance(moveRight),
            instance(moveLeft),
            instance(moveUp),
            instance(moveDown)
        );
    }

    let view: GameView;
    let getGame: GetGame;
    let moveRight: MoveRight;
    let moveLeft: MoveLeft;
    let moveUp: MoveUp;
    let moveDown: MoveDown;
    let presenter: GamePresenter;
});
