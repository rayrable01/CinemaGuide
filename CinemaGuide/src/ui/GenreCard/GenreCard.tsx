import { FC } from 'react'
import styles from './GenreCard.module.css'
import { useNavigate } from 'react-router-dom'

interface GenreCardProps {
    title: string,
    imageUrl: string
}

export const GenreCard: FC<GenreCardProps> = ({title, imageUrl}) => {
    const navigate = useNavigate()

    const moveToFilms = () => {
        navigate(`/movies?genre=${title}`)
    }

    return (
        <div className={styles.card__wrapper} onClick={moveToFilms}>
            <img src={imageUrl} alt='image'></img>
            <div className={styles.card__bottom}>
                <span className={styles.card__bottom_text}>{title}</span>
            </div>
        </div>
    )
}