
import styles from './Layout.module.css'
import { Link, useLocation } from "react-router-dom";
import headerLogo from '../../assets/logo.svg'
import vk from '../../assets/vk.svg'
import youtube from '../../assets/youtube.svg'
import ok from '../../assets/ok.svg'
import tg from '../../assets/telegram.svg'
import { FC, ReactElement, ReactNode, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { AuthForm } from '../AuthForm/AuthForm';

type LayoutProps = {
    children: ReactElement | ReactNode;
}

export const Layout: FC<LayoutProps> = ({children}) => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    return (
        <>
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link to={'/'} className={styles.header__link}>
                    <img src={headerLogo} alt="LOGO IMAGE" className={styles.header__logo}></img>
                </Link>
                <nav className={styles.header__nav}>
                    <ul className={styles.header__list}>
                        <li className={styles.header__list_item}>
                            <Link to={'/'} className={`${styles.header__nav_link} ${location.pathname === '/' || location.pathname.startsWith(`/movie/`) ? styles.active : ''}`}>Главная</Link>
                        </li>
                        <li className={styles.header__list_item}>
                            <Link to={'/genres'} className={`${styles.header__nav_link} ${location.pathname === '/genres' ? styles.active : ''}`}>Жанры</Link>
                        </li>
                    </ul>
                    <SearchBar />
                </nav>

                <Link to={'#'} className={styles.header__login} onClick={openModal}>Войти</Link>
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
        </>
    )
}