import { Link, useLocation, } from "react-router-dom"
import { useFilmsList } from "../../hooks/useFilmsList";
import Loader from "../../ui/Loader/Loader";
import styles from './GenreFilmsPage.module.css'
import { GenreFilmsList } from "../../ui/GenreFilmsList/GenreFilmsList";
import { useEffect, useState } from "react";

export const GenreFilmsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const genre = queryParams.get('genre');
    const [visibleCount, setVisibleCount] = useState(10);
    const {data, isError, isLoading} = useFilmsList({genre: genre ? genre : ''});
    
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        // Проверяем, доскроллил ли пользователь до конца страницы
        if (scrollTop + windowHeight >= fullHeight - 1) { 
            setVisibleCount(prevCount => Math.min(prevCount + 10, data.length));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data]);


    
    if (isLoading || isLoading) {
        return (
            <div className={styles.films__section}>
                <div className={styles.films__container}>
                    <Loader />
                </div>
            </div>
        )
    }

    if (isError || isError) {
        return (
            <div className={styles.films__section}>
                <div className={styles.films__container}>
                    <p className={styles.films__error}>Произошла ошибка, перезагрузите страницу.</p>
                </div>
            </div>
        )
    }
    
    return (
        <section className={styles.films__section}>
            <div className={styles.films__container}>
                <Link to={`/genres`}>
                    <h1 className={styles.genre__title_wrapper}>
                        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z" fill="white"/>
                        </svg>
                        <span className={styles.genre__title}>{genre}</span>
                    </h1>
                </Link>
                <GenreFilmsList filmsList={data.slice(0, visibleCount)} />
            </div>
        </section>
    )
}