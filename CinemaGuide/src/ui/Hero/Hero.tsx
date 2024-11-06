import styles from './Hero.module.css'
import icon from '../../assets/star.svg'
import { FormatTime} from "../../hooks/FormatTime"
import { TrailerButton } from "../TrailerButton/TrailerButton"
import { AboutFilmButton } from "../AboutFilmButton/AboutFilmButton"
import { LikeButton } from "../LikeButton/LikeButton"
import { ButtonReload } from "../ButtonReload/ButtonReload"
import { useContext } from "react"
import { MainPageContext } from "../../pages/MainPage/MainPageContext"
import { Rating } from '../Rating/Rating'


export const Hero = () => {
    const {randomFilm} = useContext(MainPageContext);
    const {data} = randomFilm;
    const movieDuration = data?.runtime ? FormatTime(data.runtime) : '';
    const backgroundImage = data?.backdropUrl;


    return (
        <section className={styles.hero__section}>
            <div className={styles.hero__container}>
                <div className={styles.hero__content}>
                    <div className={styles.hero__information}>
                        <div className={styles.hero__main_rate}>
                            <Rating 
                                rating={data.tmdbRating ? data.tmdbRating : 0}
                                classN={'hero__rating'}
                                imageURL={icon}
                            />
                            <span className={styles.hero__year}>{data?.releaseYear}</span>
                            <div className={styles.hero__genre_wrapper}>
                                {data?.genres.map((genre: string) => (
                                    <span className={styles.hero__genre} key={genre}>{genre}</span>
                                ))}
                            </div>
                            <span className={styles.hero__time}>{movieDuration}</span>
                        </div>
                        <h1 className={styles.hero__title}>{data?.originalTitle}</h1>
                        <p className={styles.hero__shortdescr}>{data?.plot}</p>
                    </div>
                    <div className={styles.hero__button_wrapper}>
                        <TrailerButton />
                        <AboutFilmButton movieId={data.id} />
                        <LikeButton />
                        <ButtonReload />
                    </div>
                </div>
                <div className={styles.hero__background} style={{backgroundImage: `url(${backgroundImage})`}}>
                    
                </div>
            </div>
        </section>
    )
}