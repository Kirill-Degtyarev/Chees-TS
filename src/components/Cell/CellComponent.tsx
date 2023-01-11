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
    console.log(cell);

    return (
        <div
            className={`${styles.cell} ${styles[cell.color]} ${selected ? styles.selected : ''} `}
            // className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
            onClick={() => click(cell)}
            style={{ background: cell.available && cell.figure ? 'green' : '' }}>
            {cell.x === 0 && <span className={styles.number}>{cell.y + 1}</span>}
            {cell.available && !cell.figure && <div className={styles.available}></div>}
            {cell.figure?.logo && (
                <img
                    src={cell.figure.logo}
                    className={
                        currentPlayer?.color === cell?.figure.color && cell.board.startGame
                            ? styles['current-figure']
                            : ''
                    }
                    alt="figure"
                />
            )}
            {cell.y === 7 && <span className={styles.alphabet}>{fieldId[cell.x]}</span>}
        </div>
    );
};
export default CellComponent;
