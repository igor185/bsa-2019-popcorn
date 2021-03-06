import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { getByIdValues } from "../repository/movieElastic.repository";
import FavoriteListRepository from "./favoriteList.repository";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async getUserById(id: string) {
    const data: { user?: User } = {};
    let error = "";
    let success = true;
    try {
      data.user = await this.findOne({
        where: { id },
        relations: ["favoriteLists"]
      });
      const movieIds = data.user.favoriteLists.map(movie => movie.movieId);
      const elasticResponse = await getByIdValues(movieIds);
      const movieArray = elasticResponse.hits.hits.map(movie => movie._source);
      data.user.favoriteLists.forEach((item: any) => {
        const movie = movieArray.find(
          movieItem => movieItem.id === item.movieId
        );
        if (!movie) {
          return;
        }
        item.movie = {
          id: movie.id,
          name: movie.title,
          release_date: movie.release_date
        };
      });
      if (!data.user) {
        throw new Error(`User with ${id} id is not found`);
      }
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async getUsers() {
    const data: { users?: User[] } = {};
    let error = "";
    let success = true;
    try {
      data.users = await this.find();
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async updateById(id, newData) {
    const data: { user?: User } = {};
    let error = "";
    let success = true;
    try {
      if (newData.favoriteMovieIds) {
        await getCustomRepository(
          FavoriteListRepository
        ).updateFavoriteMoviesByUserId(id, newData.favoriteMovieIds);
      }
      delete newData.favoriteMovieIds;
      await this.update({ id }, newData);

      data.user = (await this.getUserById(id)).data.user;
      if (!data.user) {
        throw new Error(`User with ${id} id is not found`);
      }
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async deleteById(id) {
    const data = {};
    let error = "";
    let success = true;
    try {
      const user = await this.findOne({ where: { id } });
      if (!user) {
        throw new Error(`User with ${id} id is not found`);
      }
      await this.delete({ id });
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async getByEmail(email) {
    return this.findOne({ email });
  }

  async getByToken(token) {
    return this.findOne({ reset_token: token });
  }
}

export default UserRepository;
