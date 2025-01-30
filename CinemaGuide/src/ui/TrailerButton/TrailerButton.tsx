import { useContext } from 'react'
import styles from './TrailerButton.module.css'
import { MainPageContext } from '../../pages/MainPage/MainPageContext'

export const TrailerButton = ({movieURL}) => {
    const {setIsTrailerOpen, setFilmForTrailer} = useContext(MainPageContext);
    const handleClick = () => {
        setIsTrailerOpen(true)
        setFilmForTrailer(movieURL);
    }

    return (
        <button className={styles.hero__button_trailer} onClick={handleClick}>Трейлер</button>
    )
}