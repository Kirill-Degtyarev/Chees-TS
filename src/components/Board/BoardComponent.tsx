import React, { useState, useEffect, useCallback } from 'react';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import CellComponent from '../Cell/CellComponent';

import styles from './BoardComponent.module.scss';

interface BoardProps {
    board: Board;
    currentPlayer: Player | null;
    updateBoard: () => void;
    swapPlayer: () => void;
}

const BoardComponent: React.FC<BoardProps> = ({
    board,
    updateBoard,
    currentPlayer,
    swapPlayer,
}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const highlightCells = useCallback(() => {
        board.highlightCells(selectedCell);
        updateBoard();
    }, [board, selectedCell, updateBoard]);

    useEffect(() => {
        highlightCells();
        // eslint-disable-next-line
    }, [selectedCell]);

    const click = (cell: Cell) => {
        if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell.figure?.canMove(cell) &&
            board.startGame
        ) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color && board.startGame) {
                setSelectedCell(cell);
            }
        }
    };

    return (
        <div>
            <div className={styles.board}>
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                currentPlayer={currentPlayer}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
export default BoardComponent;
