import { FC, useContext } from 'react';
import { ModalClose } from '../ModalClose/ModalClose';
import styles from './Trailer.module.css';
import { MainPageContext } from '../../pages/MainPage/MainPageContext';


export const Trailer = () => {
    const {setIsTrailerOpen, filmForTrailer} = useContext(MainPageContext);
    const onClick = () => {
        setIsTrailerOpen(false);
    }
    
    
    return (
        <div className={styles.modal__content}>
            {filmForTrailer && (
                <iframe
                width="560"
                height="315"
                src={filmForTrailer}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            )}
            <ModalClose onClick={onClick} />
        </div>
    )
}