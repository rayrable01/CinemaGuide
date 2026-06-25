import { useContext } from "react";
import { Hero } from "../../ui/Hero/Hero";
import { RatingSection } from "../../ui/RatedSection/RatingSection";
import { MainPageContext } from "./MainPageContext";
import Loader from "../../ui/Loader/Loader";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const MainPage = () => {
  const { randomFilm, ratingList } = useContext(MainPageContext);

  if (randomFilm.isLoading || ratingList.isLoading) {
    return <Loader />;
  }

  if (randomFilm.isError || ratingList.isError) {
    return <ErrorPage title="Произошла непредвиденная ошибка" />;
  }

  return (
    <>
      <Hero />
      <RatingSection />
    </>
  );
};
