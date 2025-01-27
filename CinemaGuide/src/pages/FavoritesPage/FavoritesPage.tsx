import { GenreFilmCard } from '../../ui/GenreFilmCard/GenreFilmCard'
import styles from '../PersonalPage/PersonalPage.module.css'
import { RemoveButton } from '../../ui/RemoveButton/RemoveButton'
import { FC } from 'react'
import { filmsListType } from '../../api/filmsRequests'


interface FavoritesPageProps {
    userData: filmsListType
}

export const FavoritesPage: FC<FavoritesPageProps> = ({userData}) => {
    
    return (
        <ul className={styles.favorites__list}>
            {userData.map((film) => (
                <li className={styles.list__item} key={film.id}>
                    <RemoveButton data={film} />
                    <GenreFilmCard data={film} />
                </li>
            ))}
        </ul>
    )
}