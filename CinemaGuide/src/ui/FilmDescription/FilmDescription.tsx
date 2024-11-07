import { FC } from 'react'
import { filmSchemaType } from '../../api/filmsRequests'
import styles from './FilmDescription.module.css'

interface FilmDescriptionProps {
    movieData: filmSchemaType | undefined
}

function formatCurrency(amount: any): string {
    if ( amount === null) return amount;
    
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' $';
}

export const FilmDescription: FC<FilmDescriptionProps> = ({movieData}) => {
    const formattedBudget = formatCurrency(movieData?.budget ? movieData.budget : null);
    const formattedRevenue = formatCurrency(movieData?.revenue ? movieData.revenue : null);

    return (
        <section className={styles.section__descr}>
            <div className={styles.descr__container}>
                <h2 className={styles.descr__title}>О фильме</h2>
                <ul className={styles.descr__list}>
                    <li className={styles.descr__item}>
                        <div className={styles.descr__left}>
                            <span className={styles.item__left_text}>
                                Язык оригинала
                            </span>
                            <span className={styles.item__dots}></span>
                        </div>
                        <span className={styles.item__right}>
                            {movieData?.language ? movieData.language : 'Нет информации'}
                        </span>
                    </li>
                    <li className={styles.descr__item}>
                        <div className={styles.descr__left}>
                            <span className={styles.item__left_text}>
                                Бюджет
                            </span>
                            <span className={styles.item__dots}></span>
                        </div>
                        <span className={styles.item__right}>
                            {formattedBudget ? formattedBudget : 'Нет информации'}
                        </span>
                    </li>
                    <li className={styles.descr__item}>
                        <div className={styles.descr__left}>
                            <span className={styles.item__left_text}>
                                Выручка
                            </span>
                            <span className={styles.item__dots}></span>
                        </div>
                        <span className={styles.item__right}>
                            { formattedRevenue ? formattedRevenue : 'Нет информации'}
                        </span>
                    </li>
                    <li className={styles.descr__item}>
                        <div className={styles.descr__left}>
                            <span className={styles.item__left_text}>
                                Режиссёр
                            </span>
                            <span className={styles.item__dots}></span>
                        </div>
                        <span className={styles.item__right}>
                            {movieData?.director ? movieData.director : 'Нет информации'}
                        </span>
                    </li>
                    <li className={styles.descr__item}>
                        <div className={styles.descr__left}>
                            <span className={styles.item__left_text}>
                                Продакшен
                            </span>
                            <span className={styles.item__dots}></span>
                        </div>
                        <span className={styles.item__right}>
                            {movieData?.production ? movieData.production : 'Нет информации'}
                        </span>
                    </li>
                    <li className={styles.descr__item}>
                        <div className={styles.descr__left}>
                            <span className={styles.item__left_text}>
                                Награды
                            </span>
                            <span className={styles.item__dots}></span>
                        </div>
                        <span className={styles.item__right}>
                            {movieData?.awardsSummary ? movieData.production : 'Нет информации'}
                        </span>
                    </li>
                </ul>
            </div>
        </section>
    )
}