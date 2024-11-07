import { ChangeEvent } from "react";
import styles from './SearchBar.module.css'
import { useFilmsList } from "../../hooks/useFilmsList";
import icon from '../../assets/star.svg'
import { Link, useSearchParams } from "react-router-dom";
import { Rating } from "../Rating/Rating";

export const SearchBar = () => {
    const {data, isError, isLoading} = useFilmsList();
    const [searchParam, setSearchParam] = useSearchParams()

    const searchFilm = searchParam.get('title') || '';

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setSearchParam({'title': value.toLowerCase()});
    }

    const filteredFilms = searchFilm ? data.filter((film) => film.title?.toLowerCase().includes(searchFilm.toLowerCase())) : [];

    return (
        <div className={styles.header__search_wrapper}>
            <input 
                type="search" 
                placeholder="Поиск" 
                className={styles.header__input}
                value={searchFilm}
                onChange={handleChangeSearch}
            />
            {isError && 
            <ul className={styles.header__filtered_list}>
                <li className={styles.header__filtered_item}>   
                    Произошла ошибка. Повторите позже
                </li>
            </ul>}

            {isLoading && 
            <ul className={styles.header__filtered_list}>
                <li className={styles.header__filtered_item}>   
                    Загрузка
                </li>
            </ul>}
            {filteredFilms && filteredFilms.length > 0 ? (
                <ul className={styles.header__filtered_list}>
                    {filteredFilms.map(film => (
                        <li className={styles.header__filtered_item} key={film.id}>
                            <Link to={`/movie/${film.id}`}>
                            <div className={styles.header__film_wrapper}>
                                <div className={styles.header__film_imagewrapper}>
                                    <img src={film.posterUrl ? film.posterUrl : ''}></img>
                                </div>
                                <div className={styles.header__film_content}>
                                    <div className={styles.header__film_top}>
                                        <Rating 
                                            rating={film.tmdbRating ? film.tmdbRating : 0}
                                            classN={'header__rating'}
                                            imageURL={icon}
                                        />
                                        <span className={styles.header__film_year}>{film.releaseYear}</span>
                                        <div className={styles.header__film_genre_wrapper}>
                                            {film.genres.map((genre: string) => (
                                                <span className={styles.header__genre} key={genre}>{genre}</span>
                                            ))}
                                        </div>
                                        <span className={styles.header__film_time}>{film.runtime} мин</span>
                                    </div>
                                    <h3 className={styles.header__film_title}>{film.originalTitle}</h3>
                                </div>
                            </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ): null}
        </div>
    )
}