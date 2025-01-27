import { createContext, FC, useState} from "react";
import { useRandomFilm } from "../../hooks/useRandomFilm";
import { useRatedFilms } from "../../hooks/useRatedFilms";
import { userSchemaType } from "../../api/userRequests";
import { useFavoriteFilms } from "../../hooks/useFavoriteFilms";
import { filmSchemaType } from "../../api/filmsRequests";

export const MainPageContext = createContext<any>(null);

export interface ProviderProps {
    children: React.ReactNode;
    userData?: userSchemaType;
}

export const MainPageProvider: FC<ProviderProps> = ({children, userData}) => {
    const randomFilm = useRandomFilm();
    const ratingList = useRatedFilms();
    const favoriteFilms = useFavoriteFilms();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);

    const refetchFilm = async () => {
        await randomFilm.refetch();
    }

    return (
        <MainPageContext.Provider value={{
            randomFilm, 
            ratingList, 
            refetchFilm, 
            userData, 
            favoriteFilms, 
            isModalOpen, 
            setIsModalOpen, 
            isTrailerOpen, 
            setIsTrailerOpen,
            }}>
            {children}
        </MainPageContext.Provider>
    )
}

