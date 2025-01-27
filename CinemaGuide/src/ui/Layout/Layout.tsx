
import styles from './Layout.module.css'
import { Link, useLocation } from "react-router-dom";
import headerLogo from '../../assets/logo.svg'
import vk from '../../assets/vk.svg'
import youtube from '../../assets/youtube.svg'
import adaptiveIcon from '../../assets/genres.svg'
import ok from '../../assets/ok.svg'
import tg from '../../assets/telegram.svg'
import React, { FC, ReactElement, ReactNode, useContext, useState} from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { AuthForm } from '../AuthForm/AuthForm';
import { MainPageContext} from '../../pages/MainPage/MainPageContext';
import { Trailer } from '../Trailer/Trailer';

type LayoutProps = {
    children: ReactElement | ReactNode;
}

export const Layout: FC<LayoutProps> = ({children}) => {
    const location = useLocation();
    const {userData} = useContext(MainPageContext)
    const {isModalOpen, setIsModalOpen} = useContext(MainPageContext);
    const {isTrailerOpen} = useContext(MainPageContext);
    const [adaptiveListOpen, setAdaptiveListOpen] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 800);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 800);
    }

    React.useEffect(() => {
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', () => handleResize);
            }
        }, [])
    
    return (
        <>
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link to={'/'} className={styles.header__link}>
                    <img src={headerLogo} alt="LOGO IMAGE" className={styles.header__logo}></img>
                </Link>
                <nav className={`${styles.header__nav} ${adaptiveListOpen ? styles.active : ""}`}>
                    <ul className={styles.header__list}>
                        <li className={styles.header__list_item}>
                            <Link to={'/'} className={`${styles.header__nav_link} ${location.pathname === '/' || location.pathname.startsWith(`/movie/`) ? styles.active : ''}`}>Главная</Link>
                        </li>
                        <li className={styles.header__list_item}>
                            <Link to={'/genres'} className={`${styles.header__nav_link} ${location.pathname === '/genres' ? styles.active : ''}`}>Жанры</Link>
                        </li>
                    </ul>
                </nav>

                <SearchBar />

                <button className={styles.header__menu_button} onClick={() => setAdaptiveListOpen(!adaptiveListOpen)}>
                        <img src={adaptiveIcon} alt='img'></img>
                </button>
                
                {userData && userData.name ? (
                    <Link to={'/personal/settings'} className={`${styles.header__login} ${(location.pathname === '/personal/settings' || location.pathname === '/personal/favorites') && styles.active}`}>
                        {isMobile ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white" />
                            </svg>
                        ) : (userData.name)}
                    </Link>
                ): (
                    <Link to={'#'} className={styles.header__login} onClick={openModal}>Войти</Link>
                )}
            </div>
        </header>
        <main className={styles.main}>
            {children}
        </main>
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__copyrite}>
                    <p className={styles.footer__copyrite_paragraph}>
                        <span className={styles.footer__copyrite_title}>
                            LLC «Мультимедиа Визион»
                        </span>
                        <span className={styles.footer__copyrite_text}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.2877 9.42773C15.413 7.97351 13.8195 7 12 7C9.23999 7 7 9.23999 7 12C7 14.76 9.23999 17 12 17C13.8195 17 15.413 16.0265 16.2877 14.5723L14.5729 13.5442C14.0483 14.4166 13.0927 15 12 15C10.3425 15 9 13.6575 9 12C9 10.3425 10.3425 9 12 9C13.093 9 14.0491 9.58386 14.5735 10.4568L16.2877 9.42773ZM22 12C22 6.47998 17.52 2 12 2C6.47998 2 2 6.47998 2 12C2 17.52 6.47998 22 12 22C17.52 22 22 17.52 22 12ZM4 12C4 7.57996 7.57996 4 12 4C16.42 4 20 7.57996 20 12C20 16.42 16.42 20 12 20C7.57996 20 4 16.42 4 12Z" fill="white" fillOpacity="0.7" />
                            </svg> 
                            Все права защищены
                        </span>
                    </p>
                </div>
                <div className={styles.footer__social}>
                    <ul className={styles.footer__list}>
                        <li className={styles.footer__item}>
                            <a href="/" className={styles.footer__social_link}><img src={vk} alt='VKIMG'></img></a>
                        </li>
                        <li className={styles.footer__item}>
                            <a href="/" className={styles.footer__social_link}><img src={youtube} alt='YOUTUBE'></img></a>
                        </li>
                        <li className={styles.footer__item}>
                            <a href="/" className={styles.footer__social_link}><img src={ok} alt='OK'></img></a>
                        </li>
                        <li className={styles.footer__item}>
                            <a href="/" className={styles.footer__social_link}><img src={tg} alt='TG'></img></a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>

        {isModalOpen && (
            <div className={styles.modal}>
                <AuthForm onClick={closeModal} />
            </div>
        )}

        {isTrailerOpen && (
            <div className={styles.modal}>
                <Trailer />
            </div>
        )}

        </>
    )
}