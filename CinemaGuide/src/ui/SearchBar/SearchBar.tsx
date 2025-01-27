import React, { ChangeEvent, useState } from "react";
import styles from './SearchBar.module.css'
import { useFilmsList } from "../../hooks/useFilmsList";
import icon from '../../assets/star.svg'
import { SearchIcon } from "../SearchIcon/SearchIcon";
import { Link, useSearchParams } from "react-router-dom";
import { Rating } from "../Rating/Rating";

export const SearchBar = () => {
    const [searchParam, setSearchParam] = useSearchParams()
    const searchFilm = searchParam.get('title') || '';
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 800);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    const {data, isError, isLoading} = useFilmsList({title: searchFilm, count: 5});

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setSearchParam({'title': value.toLowerCase()});
    }

    const handleResize = () => {
        setIsMobile(window.innerWidth < 800);
        if (window.innerWidth > 800) {
            setIsSearchOpen(false);
        }
        console.log(`Меняется расширение на: ${window.innerWidth}`)
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div className={`${styles.header__search_wrapper} ${isSearchOpen ? styles.header__search_open : ''}`}>
            {isMobile ? (
                <>
                {isSearchOpen ? (
                    <>
                        <input 
                        type="search" 
                        placeholder="Поиск" 
                        className={`${styles.header__input} ${isSearchOpen ? styles.header__input_open : ''}`}
                        value={searchFilm}
                        onChange={handleChangeSearch}
                        />
                        <button onClick={() => {setIsSearchOpen(!isSearchOpen)}} className={styles.search_button_exit}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="white" />
                            </svg>
                        </button>
                    </>
                    
                ) : (
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={styles.search_button}>
                        <SearchIcon />
                    </button>
                )}
                </>
            ) : (
                <input 
                    type="search" 
                    placeholder="Поиск" 
                    className={styles.header__input}
                    value={searchFilm}
                    onChange={handleChangeSearch}
                    />
            )}

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
            {searchFilm && data && data.length > 0 ? (
                <ul className={styles.header__filtered_list}>
                    {data.map(film => (
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