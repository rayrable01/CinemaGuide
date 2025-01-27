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
                    <Link to={'/personal/favorites'} className={`${styles.profile__favorites} ${location.pathname === '/personal/favorites' && styles.active}`}>Избранные фильмы</Link>
                    <Link to={'/personal/settings'} className={`${styles.profile__settings} ${location.pathname === '/personal/settings' && styles.active}`}>Настройки аккаунта</Link>
                </div>
                {location.pathname === '/personal/settings' ? <SettingsPage userData = {userData}/> : null}
                {location.pathname === '/personal/favorites' ? <FavoritesPage userData={favoriteFilms.data} /> : null}
            </div> 
        </section>
    )
}