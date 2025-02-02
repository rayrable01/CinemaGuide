import { FC } from 'react'
import { filmSchemaType } from '../../api/filmsRequests'
import styles from './FilmCard.module.css'
import { useNavigate } from 'react-router-dom'

interface CardProps {
    film: filmSchemaType,
    number: number,
    movieId: number 
}

export const FilmCard: FC<CardProps> = ({film, number, movieId}) => {
    const navigate = useNavigate();

    const moveToFilm = (movieId: number) => {
        navigate(`/movie/${movieId}`)
    }

    return (
        <div onClick={() => moveToFilm(movieId)} className={styles.card__wrapper} style={{backgroundImage: `url(${film.posterUrl})`}} role='button'>
            <span className={styles.card__number}>{number}</span>
        </div>
    )
}
