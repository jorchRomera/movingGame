import React from 'react';
import styled from 'styled-components'

import { GamePresenter, GameView } from './GamePresenter';
import { Presentable } from '../presenter/Presentable';
import Cell from './Cell';
import Chip from './Chip';
import { GameVM } from './GameVM';

export default class GamePage extends Presentable<GamePresenter, State> implements GameView {
    state: State = {
        game: null,
    };

    async componentDidMount() {
        this.addKeyboardListeners();
        await this.presenter.start();
    }

    componentWillUnmount() {
        this.removeKeyboardListeners();
    }

    private addKeyboardListeners() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this))
    }

    private removeKeyboardListeners() {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    }

    private handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowRight' :
                return this.presenter.moveRight();
            case 'ArrowLeft' :
                return this.presenter.moveLeft();
            case 'ArrowUp' :
                return this.presenter.moveUp();
            case 'ArrowDown' :
                return this.presenter.moveDown();
            default:
                return;
        }
    }

    updateGame(game: GameVM) {
        this.setState({ game });
    }

    private renderChip(row: number, column: number) {
        const position = this.state.game!.chipPosition;
        if(row === position[0] && column === position[1]) return <Chip />
        return null;
    }

    private getMessage() {
        switch (this.state.game!.status) {
            case 'win' :
                return `You Won with ${this.state.game!.movesDone} moves!!! Congratz!`;

            case 'lose' :
                return  `You have run out of moves! You Lose! :/`;
        }
    }

    Container = styled.div`
        background-color: #f1faee;
        height: 100vh;
    `;

    Title = styled.div`
        text-align: center;
        color: #a8dadc;
        background-color: #457b9d;
        padding: 20px 0;
    `;

    Message = styled.h1`
        text-align: center;
        color: #3a86ff;
    `;

    Board = styled.div`
        height: 300px;
        width: 300px;
        margin: 50px auto;
        display: grid;
        grid-template-columns: repeat(${this.state.game?.board.columns || 5}, auto);
        background-color: white;
        border: 1px black solid;
    `;

    MovesLeft = styled.div`
        text-align: center;
    `;

    render() {
        if (!this.state.game) return <p>Loading...</p>
        const { board, movesDone, movesLeft } = this.state.game;
        return (
            <this.Container>
                <this.Title>
                    <h2>Move the Circle to the end using the less moves you can!</h2>
                </this.Title>
                <this.Message>{this.getMessage()}</this.Message>
                <this.Board>
                    {board.cells.map( (cell, i) => {
                        const { position, type } = cell;
                        return <Cell row={position[0]} column={position[1]} type={type} key={i} >
                            {this.renderChip(position[0], position[1])}
                        </Cell>
                    })}
                </this.Board>
                <this.MovesLeft>
                    <h3>Moves Done <span style={style.movesDone}>{movesDone}</span></h3>
                    <h3>Moves Left <span style={style.movesLeft}>{movesLeft}</span></h3>
                </this.MovesLeft>
            </this.Container>
        );
    }
}

const style = {
    movesDone: {
        color: '#118ab2',
    },
    movesLeft: {
        color: '#e5989b',
    },
}

interface State {
    game: GameVM | null;
}
