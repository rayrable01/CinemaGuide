import { HeroFilm } from "../../ui/HeroFilm/HeroFilm"
import { ResponseMovieId, useFilmById } from "../../hooks/useFilmById"
import styles from './FilmPage.module.css'
import { useParams } from "react-router-dom"
import Loader from "../../ui/Loader/Loader"
import { FilmDescription } from "../../ui/FilmDescription/FilmDescription"
import { filmSchemaType } from "../../api/filmsRequests"

export const FilmPage = () => {
    const {movieId} = useParams()
    const film: ResponseMovieId = useFilmById(Number(movieId))
    
    if (film.isLoading) {
        return (
            <div className={styles.hero__section}>
                <div className={styles.hero__container}>
                    <Loader />
                </div>
            </div>
        )
    }

    if (film.isError) {
        return (
            <div className={styles.hero__section}>
                <div className={styles.hero__container}>
                    <p className={styles.hero__error}>Произошла ошибка, перезагрузите страницу.</p>
                </div>
            </div>
        )
    }

    return (
        <>
        <HeroFilm movieData={film.data as filmSchemaType}/>
        <FilmDescription movieData={film.data} />
        </>
    )
}