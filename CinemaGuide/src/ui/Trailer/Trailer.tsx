import { FC, useContext } from 'react';
import { ModalClose } from '../ModalClose/ModalClose';
import styles from './Trailer.module.css';
import { MainPageContext } from '../../pages/MainPage/MainPageContext';


export const Trailer = () => {
    const {setIsTrailerOpen} = useContext(MainPageContext);
    const onClick = () => {
        setIsTrailerOpen(false);
    }
    // const trailerURL = filmDataForTrailer.trailerUrl || `https://www.youtube.com/embed/${filmDataForTrailer.trailerYoutubeId}`
    
    return (
        <div className={styles.modal__content}>
            {/* <iframe
                width={100}
                height={100}
                src={trailerURL}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe> */}
            <ModalClose onClick={onClick} />
        </div>
    )
}