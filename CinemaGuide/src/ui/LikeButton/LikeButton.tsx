import styles from './LikeButton.module.css'
import { addFavoriteFilm, filmSchemaType } from '../../api/filmsRequests'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { MainPageContext} from '../../pages/MainPage/MainPageContext'

interface LikeButtonProps {
    movie: filmSchemaType
};
//! Решить проблему с ререндером цвета кнопки.
export const LikeButton: FC<LikeButtonProps> = ({movie}) => {
    const {userData} = useContext(MainPageContext);
    const [logined, setLogined] = useState<boolean>(false);
    const { setIsModalOpen} = useContext(MainPageContext);

    const fillColor = useMemo(() => {
        if (userData) {
            if (userData.favorites.includes(movie.id.toString())) {
                return '#b4a9ff'
            }
        }
        return 'white';
    }, [userData, movie.id])

    useEffect(() => {
        setLogined(!!userData);
    }, [userData])
    

    const handleSubmit = (movieId: number) => {
        addFavoriteFilm(movieId);
        console.log(`${movieId} filmId is successfully added to favorites!`)
    };
    
    const handleLogin = () => {
        setIsModalOpen(true);
        console.log('Opened login form from LikeButton')
    };

    return (
        <button className={styles.hero__button_like} onClick={logined ? (() => handleSubmit(movie.id)) : (() => handleLogin())}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" 
                fill={fillColor} />
            </svg>
        </button>
    )
}