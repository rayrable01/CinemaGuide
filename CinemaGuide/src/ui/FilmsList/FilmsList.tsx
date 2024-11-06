import { FC } from "react";
import { filmsListType } from "../../api/filmsRequests";
import { FilmCard } from "../FilmCard/FilmCard";
import styles from './FilmList.module.css'

interface FilmsListProps {
    data: filmsListType | undefined
}

export const FilmsList: FC<FilmsListProps> = ({data}) => {

    return (
        <ul className={styles.rating__list}>
            {Array.isArray(data) && data.map((film, index) => (
                <li className={styles.rating__item} key={film.id}>
                    <FilmCard film={film} number={index + 1} movieId={film.id}/>
                </li>
            ))}
        </ul>
    )
}