import { useContext } from 'react';
import { ModalClose } from '../ModalClose/ModalClose';
import styles from './Trailer.module.css';
import { MainPageContext } from '../../pages/MainPage/MainPageContext';
import ReactPlayer from 'react-player';


export const Trailer = () => {
    const {setIsTrailerOpen, filmForTrailer} = useContext(MainPageContext);
    const onClick = () => {
        setIsTrailerOpen(false);
    }
    
    
    return (
        <div className={styles.modal__content}>
            {filmForTrailer && (
                <ReactPlayer
                width="100%"
                height="100%"
                url={filmForTrailer}
                controls={true}
            ></ReactPlayer>
            )}
            <ModalClose onClick={onClick} />
        </div>
    )
}