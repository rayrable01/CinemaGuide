import { fetchTopFilmsList, filmsListType } from "../api/filmsRequests"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../api/queryClient"

export interface ResponseRatedFilms {
    data: filmsListType | undefined,
    isError: boolean,
    isLoading: boolean
}
export const useRatedFilms = (): ResponseRatedFilms => {
    const {data, isError, isLoading, error} = useQuery({
        queryFn: fetchTopFilmsList,
        queryKey: ['ratedFilms'],
    }, queryClient)
    
    if (isError) {
        console.error("Error fetching rated films:", error);
    }

    return {data, isError, isLoading}
}