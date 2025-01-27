import { fetchFavoritesFilms, filmsListType } from "../api/filmsRequests"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../api/queryClient"

export interface ResponseMovies {
    data: filmsListType | undefined,
    isError: boolean,
    isLoading: boolean
}
export const useFavoriteFilms = (): ResponseMovies => {
    const {data, isError, isLoading} = useQuery({
        queryKey: ['favoriteFilms'],
        queryFn: () => fetchFavoritesFilms(),
    }, queryClient)

    return {data, isError, isLoading}
}