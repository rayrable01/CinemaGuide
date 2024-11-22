import { createContext, FC} from "react";
import { useRandomFilm } from "../../hooks/useRandomFilm";
import { useRatedFilms } from "../../hooks/useRatedFilms";
import { userSchemaType } from "../../api/userRequests";

export const MainPageContext = createContext<any>(null);

export interface ProviderProps {
    children: React.ReactNode;
    userData?: userSchemaType;
}

export const MainPageProvider: FC<ProviderProps> = ({children, userData}) => {
    const randomFilm = useRandomFilm();
    const ratingList = useRatedFilms();

    const refetchFilm = async () => {
        await randomFilm.refetch();
    }


    return (
        <MainPageContext.Provider value={{randomFilm, ratingList, refetchFilm, userData}}>
            {children}
        </MainPageContext.Provider>
    )
}

