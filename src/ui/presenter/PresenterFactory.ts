import { GamePresenter, GameView } from '../GamePresenter';
import { Provider } from '../../core/Provider';

export class PresenterFactory {
    game(gameView: GameView): GamePresenter {
        return new GamePresenter(gameView, Provider.getBoard(), Provider.getChip());
    }
}
