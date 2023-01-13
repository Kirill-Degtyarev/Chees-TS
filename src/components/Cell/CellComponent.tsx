import React from 'react';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import SvgGenerator from '../../SvgGenerator/SvgGenerator';

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
        // e.dataTransfer.setData('text', e.currentTarget.children[0].id);
        // console.log(e.dataTransfer.getData('text'));
        // e.dataTransfer.clearData();
        console.log(e);

        click(cell);
    };
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        // console.log('2');
    };
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
        e.preventDefault();
    };
    const dropHandler = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
        e.preventDefault();
        click(cell);
    };

    return (
        <div
            className={getClass(cell, selected)}
            onClick={() => click(cell)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e, cell)}
            onDrop={(e) => dropHandler(e, cell)}>
            {cell.x === 0 && <span className={styles.number}>{cell.y + 1}</span>}
            {cell.available && !cell.figure && <div className={styles.available}></div>}
            {cell.figure && (
                <div
                    onDragStart={(e) => dragStartHandler(e, cell)}
                    draggable={cell.board.startGame}
                    className={`${
                        currentPlayer?.color === cell?.figure.color && cell.board.startGame
                            ? styles['current-figure']
                            : ''
                    } ${cell.board.startGame ? styles.draggable : ''}`}>
                    <SvgGenerator
                        id={cell.figure.name}
                        color={cell.figure.color}
                        width={48}
                        height={48}
                    />
                </div>
            )}
            {cell.y === 7 && <span className={styles.alphabet}>{fieldId[cell.x]}</span>}
        </div>
    );
};
export default CellComponent;
