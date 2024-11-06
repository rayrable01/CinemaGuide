import { useContext } from 'react';
import { FilmsList } from '../FilmsList/FilmsList'
import styles from './RatingSection.module.css'
import { MainPageContext } from '../../pages/MainPage/MainPageContext';

export const RatingSection = () => {
    const {ratingList} = useContext(MainPageContext);
    const {data} = ratingList;

    return (
        <section className={styles.rating__section}>
            <div className={styles.rating__container}>
                <h2 className={styles.rating__title}>Топ 10 фильмов</h2>
                <FilmsList data = {data}/>
            </div>
        </section>
    )
}