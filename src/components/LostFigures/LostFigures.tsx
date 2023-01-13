import React, { useRef, useEffect } from 'react';
import { Figure } from '../../models/figures/Figure';
import SvgGenerator from '../../SvgGenerator/SvgGenerator';

import styles from './LostFigures.module.scss';

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures: React.FC<LostFiguresProps> = ({ title, figures }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [figures.length]);

    return (
        <div className={styles.lost}>
            <h2 className={styles['lost-title']}>{title}</h2>
            <div className={styles['lost-figures']}>
                <div className={styles['lost-figures__body']}>
                    {figures.map((figure) => (
                        <div className={styles['lost-figures__item']} key={figure.id}>
                            <h2 className={styles['lost-figures__item-name']}>{figure.name}</h2>
                            <div className={styles['lost-figures__item-logo']}>
                                {figure && (
                                    <SvgGenerator
                                        id={figure.name}
                                        color={figure.color}
                                        width={26}
                                        height={26}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={scrollRef}></div>
            </div>
        </div>
    );
};
export default LostFigures;
