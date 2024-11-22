import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../api/userRequests"
import { queryClient } from "../api/queryClient"
import Loader from "../ui/Loader/Loader"
import { MainPageProvider } from "../pages/MainPage/MainPageContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "../ui/Layout/Layout"
import { MainPage } from "../pages/MainPage/MainPage"
import { GenresPage } from "../pages/GenresPage/GenresPage"
import { FilmPage } from "../pages/FilmPage/FilmPage"
import { GenreFilmsPage } from "../pages/GenreFilmsPage/GenreFilmsPage"

export const Account = () => {
    const myQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ['users', 'me'],
        retry: 0
    }, queryClient)
    
    switch(myQuery.status) {
        case 'pending':
            console.log('Pending Account')
            return <Loader />

        case 'error':
            console.log('error login')
            return (
                <MainPageProvider>
                    <BrowserRouter>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path='/genres' element={<GenresPage />} />
                                <Route path='/movie/:movieId' element={<FilmPage />} />
                                <Route path='/movies' element={<GenreFilmsPage />} />
                                </Routes>
                        </Layout>
                    </BrowserRouter>
                </MainPageProvider>
            )

        case 'success':
            console.log('Successful login!')
            return (
                <MainPageProvider userData={myQuery.data}>
                    <BrowserRouter>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path='/genres' element={<GenresPage />} />
                                <Route path='/movie/:movieId' element={<FilmPage />} />
                                <Route path='/movies' element={<GenreFilmsPage />} />
                            </Routes>
                        </Layout>
                    </BrowserRouter>
                </MainPageProvider>
            )
    }
}