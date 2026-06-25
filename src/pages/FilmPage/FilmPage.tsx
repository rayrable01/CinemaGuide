import { HeroFilm } from "../../ui/HeroFilm/HeroFilm";
import { ResponseMovieId, useFilmById } from "../../hooks/useFilmById";
import { useParams } from "react-router-dom";
import Loader from "../../ui/Loader/Loader";
import { FilmDescription } from "../../ui/FilmDescription/FilmDescription";
import { filmSchemaType } from "../../api/filmsRequests";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const FilmPage = () => {
  const { movieId } = useParams();
  const film: ResponseMovieId = useFilmById(Number(movieId));

  if (film.isLoading) {
    return <Loader />;
  }

  if (film.isError) {
    return <ErrorPage title="Произошла ошибка загрузки страницы фильма" />;
  }

  return (
    <>
      <HeroFilm movieData={film.data as filmSchemaType} />
      <FilmDescription movieData={film.data} />
    </>
  );
};
