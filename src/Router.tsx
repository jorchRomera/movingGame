import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withPresenter } from './ui/presenter/withPresenter';
import { PresenterFactory } from './ui/presenter/PresenterFactory';
import GamePage from './ui/GamePage';

const presenterFactory = new PresenterFactory();

function Router() {
    return (
        <BrowserRouter basename='/'>
            <Switch>
                <Route path='/' component={withPresenter(GamePage, presenterFactory.game)} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;