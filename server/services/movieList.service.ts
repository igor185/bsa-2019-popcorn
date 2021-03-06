import MovieListRepository from "../repository/movieList.repository";
import { getCustomRepository } from "typeorm";
import * as elasticRepository from "../repository/movieElastic.repository";
export class IRequest {
  title: string;
  userId?: string;
  description?: string;
  imageUrl?: string;
  moviesId: string[];
}

export const saveMovieList = (userId: string, movieList: IRequest) =>
  getCustomRepository(MovieListRepository).save({
    user: { id: userId },
    ...movieList
  });

export const getListsByUserId = (userId: string, passportUserId: string) =>
  userId === passportUserId
    ? getCustomRepository(MovieListRepository).find({
        where: { user: { id: userId } },
        order: { createdAt: "DESC" }
      })
    : getCustomRepository(MovieListRepository).getListsByUserId(userId);

export const getOwnUserLists = (userId: string) =>
  getCustomRepository(MovieListRepository).find({
    where: { user: { id: userId } },
    order: { createdAt: "DESC" }
  });

export const deleteMovieList = (movieListId: string) =>
  getCustomRepository(MovieListRepository).delete({ id: movieListId });

export const updateMovieList = (movieListId: string, movieList: IRequest) =>
  getCustomRepository(MovieListRepository).update(
    { id: movieListId },
    movieList
  );

export const getMovieListDetails = async (movieListId: string) => {
  const movieList = await getCustomRepository(MovieListRepository).getListById(
    movieListId
  );

  const { moviesId } = movieList;
  const elasticProperties = [
    "id",
    "title",
    "runtime",
    "poster_path",
    "release_date",
    "genres",
    "overview"
  ];

  const elasticData = await elasticRepository.getPropertiesByIdValues(
    moviesId,
    elasticProperties
  );

  const movies = elasticData.hits.hits.map(data => data._source);
  const moviesWithGenres = movies.map(movie => {
    const genres = movie["genres"] ? JSON.parse(movie["genres"]) : [];
    movie.genres = genres.map(genre => genre.name);
    return movie;
  });

  movies.sort(
    (a, b) =>
      moviesId.indexOf(a.id.toString()) - moviesId.indexOf(b.id.toString())
  );

  return { movieList, movies: moviesWithGenres };
};

export const getAllMovieLists = () =>
  getCustomRepository(MovieListRepository).getAll();
