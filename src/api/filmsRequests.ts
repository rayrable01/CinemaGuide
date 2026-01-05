import z from 'zod'
import { queryClient } from './queryClient';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

// Схема фильма.
export const filmSchema = z.object({
    id: z.number(),
    title: z.string().optional().nullable(),
    originalTitle: z.string().optional().nullable(),
    language: z.string().optional().nullable(),
    releaseYear: z.number().optional().nullable(),
    releaseDate: z.string().optional().nullable(),
    genres: z.array(z.string()), // обязательный массив
    plot: z.string().optional().nullable(),
    runtime: z.number(),
    budget: z.string().optional().nullable(),
    revenue: z.string().optional().nullable(),
    homepage: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    posterUrl: z.string().optional().nullable(),
    backdropUrl: z.string().optional().nullable(),
    trailerUrl: z.string().optional().nullable(),
    trailerYoutubeId: z.string().optional().nullable(),
    tmdbRating: z.number().optional().nullable(),
    searchL: z.string().optional().nullable(),
    keywords: z.array(z.string()), // обязательный массив
    countriesOfOrigin: z.array(z.string()), // обязательный массив
    languages: z.array(z.string()), // обязательный массив
    cast: z.array(z.string()), // обязательный массив
    director: z.string().optional().nullable(),
    production: z.string().optional().nullable(),
    awardsSummary: z.string().optional().nullable(),
});


// Схема списка фильмов
export const filmsListSchema = z.array(filmSchema);

// Тип для фильма и массива фильмов
export type filmSchemaType = z.infer<typeof filmSchema>
export type filmsListType = z.infer<typeof filmsListSchema>

// Схема для запроса на фильмы. То есть что мы получаем от сервера.
export const fetchFilmsListSchema = z.array(filmSchema);
export type fetchFilmsListType = z.infer<typeof fetchFilmsListSchema>

// Функция запрос на получение фильмов + фильр
export interface FilmListParams {
    genre?: string;
    title?: string;
    count?: number;
    page?: number;
}

export const fetchFilmsList = (params: FilmListParams): Promise<fetchFilmsListType> => {
    // Конструируем URL с query-параметрами
    const query = new URLSearchParams();

    // Добавляем параметры к запросу только если они определены
    if (params.genre) query.append("genre", params.genre);
    if (params.title) query.append("title", params.title);
    if (params.count) query.append("count", params.count.toString());
    if (params.page) query.append("page", params.page.toString());

    // Собираем полный URL
    const url = `${API_URL}/movie?${query.toString()}`;

    return axios.get(url)
        .then(res => fetchFilmsListSchema.parse(res.data));
};


// Функция на получение топ 10 фильмов.
export const fetchTopFilmsList = (): Promise<fetchFilmsListType> => {
    return axios.get(`${API_URL}/movie/top10`).then(res => fetchFilmsListSchema.parse(res.data))
}

// РАНДОМ ФИЛЬМ
export const fetchRandomFilm = (): Promise<filmSchemaType> => {
    return axios.get(`${API_URL}/movie/random`).then(res => filmSchema.parse(res.data))
}

// Получение фильма по ID
export const fetchFilmId = (movieId: number): Promise<filmSchemaType> => {
    return axios.get(`${API_URL}/movie/${movieId}`).then(res => filmSchema.parse(res.data))
}

// Получение жанров фильмов
export const genreSchema = z.string();
export const genreListSchema = z.array(genreSchema);

export type genreSchemaType = z.infer<typeof genreSchema>
export type genreListShemaType = z.infer<typeof genreListSchema>


export const fetchFilmsGenre = (): Promise<genreListShemaType> => {
    return axios.get(`${API_URL}/movie/genres`).then(res => genreListSchema.parse(res.data))
}

// Получение любимых фильмов
export const fetchFavoritesFilms = (): Promise<filmsListType> => {
    return axios.get(`${API_URL}/favorites`, {
        withCredentials: true
    }).then(res => filmsListSchema.parse(res.data))
}

export const addFavoriteFilm = (id: number): Promise<void> => {
    return axios.post(
        `${API_URL}/favorites`,
        new URLSearchParams({ id: id.toString() }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        }
    )
    .then(() => {
        queryClient.invalidateQueries({ queryKey: ['favoriteFilms'] });
    })
};


export const removeFavoriteFilm = (movieId: number): Promise<void> => {
    return axios.delete(`${API_URL}/favorites/${movieId}`, {
        withCredentials: true
    })
}