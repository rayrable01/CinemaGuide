import { FC } from 'react';
import styles from './ShowMoreButton.module.css'

interface ShowMoreButtonProps {
    onClick: () => void;
    isDisabled: boolean;
}

export const ShowMoreButton: FC<ShowMoreButtonProps> = ({onClick, isDisabled}) => {
    return (
        <button onClick={onClick} className={styles.button} disabled={isDisabled}>Показать ещё</button>
    )
}