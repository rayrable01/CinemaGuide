import { useFilmsGenre } from "../../hooks/useFilmsGenre";
import { GenreList } from "../../ui/GenreList/GenreList";
import Loader from "../../ui/Loader/Loader";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import styles from "./GenresPage.module.css";

export const GenresPage = () => {
  const { data, isError, isLoading } = useFilmsGenre();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage title="Произошла ошибка загрузкиж жанров" />;
  }

  return (
    <section className={styles.genres__section}>
      <div className={styles.genres__container}>
        <h1 className={styles.genres__title}>Жанры фильмов</h1>
        <GenreList data={data} />
      </div>
    </section>
  );
};
