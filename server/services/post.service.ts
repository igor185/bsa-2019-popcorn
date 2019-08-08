import { Post } from '../models/PostModel';
import PostRepository from '../repository/post.repository';
import UserRepository from '../repository/user.repository'
import { getCustomRepository } from "typeorm";

export const createPost = async (post: any): Promise<Post> => {

    post.user = await getCustomRepository(UserRepository).findOne(post.userId);
    delete post.userId;
    return await getCustomRepository(PostRepository)
        .save(post);
}

export const getPosts = async (): Promise<Post[]> =>
    await getCustomRepository(PostRepository)
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .getMany()

export const deletePostById = async (postId: number): Promise<Post> => {
    const post = await getCustomRepository(PostRepository).findOne(postId);
    return await getCustomRepository(PostRepository).remove(post);
}

export const getPostById = async (postId: number): Promise<Post> =>
    await getCustomRepository(PostRepository)
        .findOne(postId);

export const getPostsByUserId = async (userId: number): Promise<Post[]> =>
    await getCustomRepository(PostRepository)
        .find({ relations: ['user'], where: { user: { id: userId } } });