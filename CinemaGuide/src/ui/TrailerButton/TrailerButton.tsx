import { useContext } from 'react'
import styles from './TrailerButton.module.css'
import { MainPageContext } from '../../pages/MainPage/MainPageContext'

export const TrailerButton = () => {
    const {setIsTrailerOpen} = useContext(MainPageContext);

    return (
        <button className={styles.hero__button_trailer} onClick={() => setIsTrailerOpen(true)}>Трейлер</button>
    )
}