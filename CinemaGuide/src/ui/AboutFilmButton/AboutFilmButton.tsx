import { useNavigate } from 'react-router-dom'
import styles from './AboutFilmButton.module.css'
import { FC } from 'react';

interface AboutFilmButtonProps {
    movieId: number | string 
}

export const AboutFilmButton: FC<AboutFilmButtonProps> = ({movieId}) => {
    const navigate = useNavigate();
    
    const moveToFilm = (movieId: number | string ) => {
        navigate(`/movie/${movieId}`)
    }

    return (
        <button className={styles.hero__button_about} onClick={() => moveToFilm(movieId)}>О фильме</button>
    )
}