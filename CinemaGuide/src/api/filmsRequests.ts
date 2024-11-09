import z from 'zod'
import { validateResponse } from './validateRespose';

const API_URL = 'https://cinemaguide.skillbox.cc'

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

    return fetch(url)
        .then(response => validateResponse(response))
        .then(res => res.json())
        .then(data => fetchFilmsListSchema.parse(data));
};


// Функция на получение топ 10 фильмов.
export const fetchTopFilmsList = (): Promise<fetchFilmsListType> => {
    return fetch(`${API_URL}/movie/top10`)
    .then(response => validateResponse(response))
    .then(res => res.json())
    .then(data => fetchFilmsListSchema.parse(data))
};

// РАНДОМ ФИЛЬМ
export const fetchRandomFilm = (): Promise<filmSchemaType> => {
    return fetch(`${API_URL}/movie/random`)
    .then(response => validateResponse(response))
    .then(res => res.json())
    .then(data => filmSchema.parse(data));
}

// Получение фильма по ID
export const fetchFilmId = (movieId: number): Promise<filmSchemaType> => {
    return fetch(`${API_URL}/movie/${movieId}`)
    .then(response => validateResponse(response))
    .then(res => res.json())
    .then(data => filmSchema.parse(data));
}

// Получение жанров фильмов
export const genreSchema = z.string();
export const genreListSchema = z.array(genreSchema);

export type genreSchemaType = z.infer<typeof genreSchema>
export type genreListShemaType = z.infer<typeof genreListSchema>

export const fetchFilmsGenre = (): Promise<genreListShemaType> => {
    return fetch(`${API_URL}/movie/genres`)
    .then(response => validateResponse(response))
    .then(res => res.json())
    .then(data => genreListSchema.parse(data));
};