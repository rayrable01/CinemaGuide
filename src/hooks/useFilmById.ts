import { fetchFilmId, filmSchemaType } from "../api/filmsRequests"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../api/queryClient"

export interface ResponseMovieId {
    data: filmSchemaType | undefined,
    isError: boolean,
    isLoading: boolean
}
export const useFilmById = (movieId: number): ResponseMovieId => {
    const {data, isError, isLoading} = useQuery({
        queryKey: ['filmId', movieId],
        queryFn: () => fetchFilmId(movieId),
    }, queryClient)

    return {data, isError, isLoading}
}