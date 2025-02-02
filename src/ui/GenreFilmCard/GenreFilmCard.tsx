import { FC } from "react"
import { filmSchemaType } from "../../api/filmsRequests"
import styles from './GenreFilmCard.module.css'
import { useNavigate } from "react-router-dom"

interface GenreFilmCardProps {
    data: filmSchemaType
}

export const GenreFilmCard: FC<GenreFilmCardProps> = ({data}) => {
    const navigate = useNavigate();

    const moveToFilm = (movieId: string | number) => {
        navigate(`/movie/${movieId}`)
    }
    
    return (
        <div  className={styles.card__wrapper} style={{backgroundImage: `url(${data.posterUrl})`}} role='button' onClick={() => moveToFilm(data.id)}> 
        </div>
    )
}