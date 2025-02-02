import { useFilmsGenre } from "../../hooks/useFilmsGenre"
import { GenreList } from "../../ui/GenreList/GenreList";
import Loader from "../../ui/Loader/Loader";
import styles from './GenresPage.module.css'

export const GenresPage = () => {
    const {data, isError, isLoading} = useFilmsGenre();

    if (isLoading) {
        return (
            <div className={styles.genres__section}>
                <div className={styles.genres__container}>
                    <Loader />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className={styles.genres__section}>
                <div className={styles.genres__container}>
                    <p className={styles.genres__error}>Произошла ошибка, перезагрузите страницу.</p>
                </div>
            </div>
        )
    }

    return (
        <section className={styles.genres__section}>
            <div className={styles.genres__container}>
                <h1 className={styles.genres__title}>Жанры фильмов</h1>
                <GenreList data={data} />
            </div>
        </section>
    )
}