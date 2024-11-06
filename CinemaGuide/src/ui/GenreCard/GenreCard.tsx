import { FC } from 'react'
import styles from './GenreCard.module.css'

interface GenreCardProps {
    title: string,
    imageUrl: string
}

export const GenreCard: FC<GenreCardProps> = ({title, imageUrl}) => {
    return (
        <div className={styles.card__wrapper}>
            <img src={imageUrl} alt='image'></img>
            <div className={styles.card__bottom}>
                <span className={styles.card__bottom_text}>{title}</span>
            </div>
        </div>
    )
}