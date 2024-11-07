import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './ui/Layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { GenresPage } from './pages/GenresPage/GenresPage'
import { MainPageProvider } from './pages/MainPage/MainPageContext'
import { FilmPage } from './pages/FilmPage/FilmPage'

function App() {

  return (
    <MainPageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/genres' element={<GenresPage />} />
            <Route path='/movie/:movieId' element={<FilmPage />} /> 
          </Routes>
        </Layout>
      </BrowserRouter>
    </MainPageProvider>
  )
}

export default App
