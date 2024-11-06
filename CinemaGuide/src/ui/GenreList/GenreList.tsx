import { FC } from 'react'
import { genreListShemaType } from '../../api/filmsRequests'
import styles from './GenreList.module.css'
import { GenreCard } from '../GenreCard/GenreCard'
import image from '../../assets/advanture.png'

interface GenreListProps {
    data: genreListShemaType | undefined
}

// const urlArray = [
//     '../../assets/advanture.png',
//     '../../assets/comedy.png',
//     '../../assets/detective.png',
//     '../../assets/drama.png',
//     '../../assets/family.png',
//     '../../assets/fantasy.png',
//     '../../assets/history.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
//     '../../assets/triller.png',
// ]

export const GenreList: FC<GenreListProps> = ({data}) => {
    return (
        <ul className={styles.genre__list}>
            {Array.isArray(data) && data.map((genre, index) => (
                <li className={styles.genre__item} key={index}>
                    <GenreCard title={genre} imageUrl={image} />
                </li>
            ))}
        </ul>
    )
}