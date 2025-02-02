import { FC} from 'react'
import { filmSchemaType } from '../../api/filmsRequests'
import { Rating } from '../Rating/Rating'
import { TrailerButton } from '../TrailerButton/TrailerButton'
import styles from './HeroFilm.module.css'
import icon from '../../assets/star.svg'
import { LikeButton } from '../LikeButton/LikeButton'
import { FormatTime } from '../../hooks/FormatTime'


interface HeroFilmProps {
    movieData: filmSchemaType
}

export const HeroFilm: FC<HeroFilmProps> = ({movieData}) => {
    const movieDuration = movieData?.runtime ? FormatTime(movieData.runtime) : '';
    const backgroundImage = movieData?.backdropUrl;

    return (
        <section className={styles.hero__section}>
            <div className={styles.hero__container}>
                <div className={styles.hero__content}>
                    <div className={styles.hero__information}>
                        <div className={styles.hero__main_rate}>
                            <Rating 
                                rating={movieData?.tmdbRating ? movieData.tmdbRating : 0}
                                classN={'hero__rating'}
                                imageURL={icon}
                            />
                            <span className={styles.hero__year}>{movieData?.releaseYear}</span>
                            <div className={styles.hero__genre_wrapper}>
                                {movieData?.genres.map((genre: string) => (
                                    <span className={styles.hero__genre} key={genre}>{genre}</span>
                                ))}
                            </div>
                            <span className={styles.hero__time}>{movieDuration}</span>
                        </div>
                        <h1 className={styles.hero__title}>{movieData?.originalTitle}</h1>
                        <p className={styles.hero__shortdescr}>{movieData?.plot}</p>
                    </div>
                    <div className={styles.hero__button_wrapper}>
                        <TrailerButton movieURL={movieData.trailerUrl as string}/>
                        <LikeButton movie={movieData} />
                    </div>
                </div>
                <div className={styles.hero__background} style={{backgroundImage: `url(${backgroundImage})`}}>
                    
                </div>
            </div>
        </section>
    )
}
