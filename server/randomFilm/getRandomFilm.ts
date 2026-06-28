import { Router } from "express";

export const getRandomFilm = Router().get(
  "/movie/random",
  (_request, response) => {
    response.send({
      id: 581032,
      title: "TEST TEST 123123",
      originalTitle: "News of the World",
      language: "en",
      releaseYear: 2020,
      releaseDate: "2020-12-25",
      genres: ["drama", "western", "adventure"],
      plot: "A Texan traveling across the wild West bringing the news of the world to local townspeople, agrees to help rescue a young girl who was kidnapped.",
      runtime: 118,
      budget: "38000000",
      revenue: "12700000",
      homepage: "https://www.universalpictures.com/movies/news-of-the-world",
      status: "released",
      posterUrl:
        "https://cinemaguide.skillbox.cc/images/581032/fYQCgVRsQTEfUrP7cW5iAFVYOlh.jpg",
      backdropUrl:
        "https://cinemaguide.skillbox.cc/images/581032/oyBZyY5GdzZdofVVsDda49QmvFP.jpg",
      trailerUrl: "https://youtube.com/watch?v=zTZDb_iKooI",
      trailerYouTubeId: "zTZDb_iKooI",
      tmdbRating: 6.971,
      searchL: "news of the world. paul greengrass",
      keywords: [],
      countriesOfOrigin: [],
      languages: [],
      cast: [],
      director: "Paul Greengrass",
      production: null,
      awardsSummary: null,
    });
  },
);
