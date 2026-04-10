import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/userRequests";
import { queryClient } from "../api/queryClient";
import Loader from "../ui/Loader/Loader";
import { MainPageProvider } from "../pages/MainPage/MainPageContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../ui/Layout/Layout";
import { MainPage } from "../pages/MainPage/MainPage";
import { GenresPage } from "../pages/GenresPage/GenresPage";
import { FilmPage } from "../pages/FilmPage/FilmPage";
import { GenreFilmsPage } from "../pages/GenreFilmsPage/GenreFilmsPage";
import { PersonalPage } from "../pages/PersonalPage/PersonalPage";

export const Account = () => {
  const myQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
      retry: 0,
    },
    queryClient,
  );

  switch (myQuery.status) {
    case "pending":
      return <Loader />;

    case "error":
      return (
        <MainPageProvider>
          <BrowserRouter basename="/CinemaGuide/">
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/movie/:movieId" element={<FilmPage />} />
                <Route path="/movies" element={<GenreFilmsPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </MainPageProvider>
      );

    case "success":
      return (
        <MainPageProvider userData={myQuery.data}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/movie/:movieId" element={<FilmPage />} />
                <Route path="/movies" element={<GenreFilmsPage />} />
                <Route path="/personal/settings" element={<PersonalPage />} />
                <Route path="/personal/favorites" element={<PersonalPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </MainPageProvider>
      );
  }
};
