import React from 'react';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';

import styles from './CellComponent.module.scss';

interface CellProps {
    cell: Cell;
    selected: boolean;
    currentPlayer: Player | null;
    click: (cell: Cell) => void;
}

const fieldId: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const CellComponent: React.FC<CellProps> = ({ cell, selected, click, currentPlayer }) => {
    const getClass = (cell: Cell, selected: boolean): string => {
        const className: string = `${styles.cell} ${styles[cell.color]} ${
            selected ? styles.selected : ''
        } ${cell.available && cell.figure ? styles.green : ''}`;
        return className;
    };

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
        click(cell);
    };
    // const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //     console.log('2');
    // };
    // const dragOverHandler = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
    //     console.log(cell);
    //     e.preventDefault();
    // };
    const dropHandler = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
        e.preventDefault();
        click(cell);
    };

    return (
        <div
            className={getClass(cell, selected)}
            onClick={() => click(cell)}
            onDragStart={(e) => dragStartHandler(e, cell)}
            // onDragLeave={(e) => dragEndHandler(e)}
            // onDragEnd={(e) => dragEndHandler(e)}
            // onDragOver={(e) => dragOverHandler(e, cell)}
            onDrop={(e) => dropHandler(e, cell)}
            draggable={cell.board.startGame}>
            {cell.x === 0 && <span className={styles.number}>{cell.y + 1}</span>}
            {cell.available && !cell.figure && <div className={styles.available}></div>}
            {cell.figure?.logo && (
                <img
                    src={cell.figure.logo}
                    className={`${
                        currentPlayer?.color === cell?.figure.color && cell.board.startGame
                            ? styles['current-figure']
                            : ''
                    } ${cell.board.startGame ? styles.draggable : ''}`}
                    alt="figure"
                />
            )}
            {cell.y === 7 && <span className={styles.alphabet}>{fieldId[cell.x]}</span>}
        </div>
    );
};
export default CellComponent;
