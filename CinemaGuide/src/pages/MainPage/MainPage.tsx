import { useContext } from "react"
import { Hero } from "../../ui/Hero/Hero"
import { RatingSection } from "../../ui/RatedSection/RatingSection"
import { MainPageContext } from "./MainPageContext"
import styles from './MainPage.module.css'
import Loader from "../../ui/Loader/Loader"

export const MainPage = () => {
    const {randomFilm, ratingList} = useContext(MainPageContext);

    if (randomFilm.isLoading || ratingList.isLoading) {
        return (
            <div className={styles.hero__section}>
                <div className={styles.hero__container}>
                    <Loader />
                </div>
            </div>
        )
    }

    if (randomFilm.isError || ratingList.isError) {
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
            <Hero />
            <RatingSection  />
        </>
    )
}