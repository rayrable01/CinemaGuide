import { FC } from 'react'
import { filmsListType } from '../../api/filmsRequests'
import styles from './GenreFilmsList.module.css'
import { GenreFilmCard } from '../GenreFilmCard/GenreFilmCard'

interface GenreFilmsListProps {
    filmsList: filmsListType
}

export const GenreFilmsList: FC<GenreFilmsListProps> = ({filmsList}) => {
    if (!filmsList || filmsList.length <= 0) {
        return (
            <div className={styles.hero__section}>
                <div className={styles.hero__container}>
                    <p className={styles.films__empty}>Нет фильмов для данного жанра</p>
                </div>
            </div>
        )
    }

    return (
        <ul className={styles.films__list}>
            {filmsList && filmsList.length > 0 ? (
                filmsList.map((film) => (
                    <li className={styles.list__item} key={film.id}>
                        <GenreFilmCard data={film} />
                    </li>
                ))
            ): null}
        </ul>
    )
}