import { fetchFilmsList, FilmListParams, filmsListType } from "../api/filmsRequests"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../api/queryClient"

export interface ResponseFilmsList {
    data: filmsListType,
    isError: boolean,
    isLoading: boolean
}
export const useFilmsList = (params: FilmListParams = { count: 5 }): ResponseFilmsList => { 
    const { data, isError, isLoading } = useQuery({
        queryFn: () => fetchFilmsList(params),
        queryKey: ['films', params],
        initialData: [],
    }, queryClient);

    return { data, isError, isLoading };
};