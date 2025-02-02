import { Link, useLocation } from 'react-router-dom'
import styles from './PersonalPage.module.css'
import customStyles from '../MainPage/MainPage.module.css'
import { useContext } from 'react'
import { MainPageContext } from '../MainPage/MainPageContext'
import { SettingsPage } from '../SettingsPage/SettingsPage'
import { FavoritesPage } from '../FavoritesPage/FavoritesPage'
import Loader from '../../ui/Loader/Loader'


export const PersonalPage = () => {
    const {userData, favoriteFilms} = useContext(MainPageContext);
    const location = useLocation();

    if (favoriteFilms.isLoading || userData.isLoading) {
        return (
            <div className={customStyles.hero__section}>
                <div className={customStyles.hero__container}>
                    <Loader />
                </div>
            </div>
        )
    }

    if (favoriteFilms.isError || userData.isError) {
        return (
            <div className={customStyles.hero__section}>
                <div className={customStyles.hero__container}>
                    <p className={customStyles.hero__error}>Произошла ошибка, перезагрузите страницу.</p>
                </div>
            </div>
        )
    }

    return ( 
        <section className={styles.profile__section}>
            <div className={styles.profile__container}>
                <h1 className={styles.profile__title}>Мой аккаунт</h1>
                <div className={styles.profile__navigation}>
                    <Link to={'/personal/favorites'} className={`${styles.profile__favorites} ${location.pathname === '/personal/favorites' && styles.active}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white" />
                        </svg>
                    </Link>
                    <Link to={'/personal/settings'} className={`${styles.profile__settings} ${location.pathname === '/personal/settings' && styles.active}`}>
                        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z" fill="white" />
                        </svg>
                    </Link>
                </div>
                {location.pathname === '/personal/settings' ? <SettingsPage userData = {userData}/> : null}
                {location.pathname === '/personal/favorites' ? <FavoritesPage userData={favoriteFilms.data} /> : null}
            </div> 
        </section>
    )
}