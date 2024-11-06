import { fetchRandomFilm, filmSchemaType } from "../api/filmsRequests"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../api/queryClient"

export interface ResponseRandomFilm {
    data: filmSchemaType | undefined
    isError: boolean,
    isLoading: boolean,
    refetch: () => Promise<ResponseRandomFilm>,
}

export const useRandomFilm = (): ResponseRandomFilm => {
    const {data, isError, isLoading, refetch} = useQuery({
        queryFn: fetchRandomFilm,
        queryKey: ['randomFilm'],
    }, queryClient)

    return {data, isError, isLoading, refetch}
}