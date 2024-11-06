import { useQuery } from "@tanstack/react-query";
import { fetchFilmsGenre, genreListShemaType } from "../api/filmsRequests";
import { queryClient } from "../api/queryClient";

export interface ResponseFilmsGenre {
    data: genreListShemaType | undefined,
    isError: boolean,
    isLoading: boolean
}

export const useFilmsGenre = (): ResponseFilmsGenre => {
    const {data, isError, isLoading} = useQuery({
        queryFn: fetchFilmsGenre,
        queryKey: ['filmsGenre'],
    }, queryClient)

    return {data, isError, isLoading}
}