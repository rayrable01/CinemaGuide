import { fetchFilmsList, filmsListType } from "../api/filmsRequests"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../api/queryClient"

export interface ResponseFilmsList {
    data: filmsListType,
    isError: boolean,
    isLoading: boolean
}
export const useFilmsList = (): ResponseFilmsList => { // QUERY PARAMS СДЕЛАТЬ. COUNT 5
    const {data, isError, isLoading} = useQuery({
        queryFn: fetchFilmsList,
        queryKey: ['films'],
        initialData: [],
    }, queryClient)

    return {data, isError, isLoading}
}