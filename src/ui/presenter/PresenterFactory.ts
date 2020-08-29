import { GamePresenter, GameView } from '../game/GamePresenter';
import { Provider } from '../../core/Provider';

export class PresenterFactory {
    game(gameView: GameView): GamePresenter {
        return new GamePresenter(
            gameView,
            Provider.getGame(),
            Provider.moveRight(),
            Provider.moveLeft(),
            Provider.moveUp(),
            Provider.moveDown()
        );
    }
}
