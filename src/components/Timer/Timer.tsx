import React, { useState, useRef, useEffect } from 'react';
import { Board } from '../../models/Board';
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';

import styles from './Timer.module.scss';

interface TimerProps {
  currentPlayer: Player | null;
  board: Board;
  restart: () => void;
  updateBoard: () => void;
  setSelectedCell: (cell: null) => void;
}

const Timer: React.FC<TimerProps> = ({
  currentPlayer,
  restart,
  updateBoard,
  board,
  setSelectedCell,
}) => {
  const [firstPlay, setFirstPlay] = useState(false);
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (board.startGame) {
      startTimer();
    }
    // eslint-disable-next-line
  }, [currentPlayer]);

  const startTimer = () => {
    if (!board.startGame) {
      setFirstPlay(true);
      board.updateStartGame();
      updateBoard();
    }
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  };

  const decrementBlackTimer = () => {
    setBlackTime((prev) => prev - 1);
  };

  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => prev - 1);
  };

  const handleRestart = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setFirstPlay(false);
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };

  const getTime = (time: number): string | null => {
    let timeString = null;
    if (time === 0) {
      handleRestart();
    }
    if (time % 60 === 0) {
      timeString = Math.floor(time / 60) + ':00';
    }
    if (time % 60 >= 10) {
      timeString = Math.floor(time / 60) + ':' + (time % 60);
    }
    if (time % 60 < 10) {
      timeString = Math.floor(time / 60) + ':0' + (time % 60);
    }
    return timeString;
  };

  const stopTimer = () => {
    board.updateStartGame();
    updateBoard();
    setSelectedCell(null);
    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  return (
    <div className={styles['timer-body']}>
      <div className={styles['timer-body__button']}>
        {!board.startGame && (
          <div className={styles.button} onClick={startTimer}>
            Start Game
          </div>
        )}
        {board.startGame && (
          <div className={styles.button} onClick={stopTimer}>
            Stop Game
          </div>
        )}
        {board.startGame && (
          <div className={styles.button} onClick={handleRestart}>
            Restart Game
          </div>
        )}
      </div>
      {(board.startGame || firstPlay) && (
        <div className={styles['timer-body__time']}>
          <h2 className={`${styles.time} ${styles['time-black']}`}>
            Чёрные - {getTime(blackTime)}
          </h2>
          <h2 className={`${styles.time} ${styles['time-white']}`}>
            Белые - {getTime(whiteTime)}
          </h2>
        </div>
      )}
    </div>
  );
};
export default Timer;
