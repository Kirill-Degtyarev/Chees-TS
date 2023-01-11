import React, { useState, useEffect, useCallback } from 'react';
import BoardComponent from './components/Board/BoardComponent';
import LostFigures from './components/LostFigures/LostFigures';
import Timer from './components/Timer/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

import './scss/fonts.scss';
import './scss/_normalize.scss';
import './scss/App.scss';

const App: React.FC = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer] = useState(new Player(Colors.WHITE, 0));
    const [blackPlayer] = useState(new Player(Colors.BLACK, 1));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    const restart = useCallback(() => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setCurrentPlayer(getRandomPlayer(11) <= 5 ? whitePlayer : blackPlayer);
        setBoard(newBoard);
    }, [whitePlayer, blackPlayer]);

    useEffect(() => {
        restart();
        setCurrentPlayer(getRandomPlayer(11) <= 5 ? whitePlayer : blackPlayer);
    }, [whitePlayer, blackPlayer, restart]);

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    const swapPlayer = () => {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    };

    const getRandomPlayer = (id: number): number => {
        return Math.floor(Math.random() * id);
    };

    return (
        <div className="wrapper">
            <div className="chees__container">
                <div className="chees-body">
                    <div className="game-info">
                        {board.startGame && (
                            <h3 className="user-info">Текущий игрок: {currentPlayer?.color}</h3>
                        )}
                        <Timer
                            currentPlayer={currentPlayer}
                            restart={restart}
                            board={board}
                            updateBoard={updateBoard}
                        />
                    </div>
                    <div className="board-body">
                        <BoardComponent
                            board={board}
                            updateBoard={updateBoard}
                            currentPlayer={currentPlayer}
                            swapPlayer={swapPlayer}
                        />
                    </div>
                    <div className="results-game">
                        {!!board.lostBlackFigure.length && (
                            <LostFigures title="Чёрные фигруры" figures={board.lostBlackFigure} />
                        )}
                        {!!board.lostWhiteFigure.length && (
                            <LostFigures title="Белые фигруры" figures={board.lostWhiteFigure} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
