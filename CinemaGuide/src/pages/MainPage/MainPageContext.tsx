import { createContext, FC} from "react";
import { useRandomFilm } from "../../hooks/useRandomFilm";
import { useRatedFilms } from "../../hooks/useRatedFilms";

export const MainPageContext = createContext<any>(null);

export interface ProviderProps {
    children: React.ReactNode;
}

export const MainPageProvider: FC<ProviderProps> = ({children}) => {
    const randomFilm = useRandomFilm();
    const ratingList = useRatedFilms();

    const refetchFilm = async () => {
        await randomFilm.refetch();
    }


    return (
        <MainPageContext.Provider value={{randomFilm, ratingList, refetchFilm}}>
            {children}
        </MainPageContext.Provider>
    )
}

