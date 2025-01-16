import {NotFoundError} from '@/domain/errors'
import {UseCaseParams} from '../types'
import {IPost} from '@/domain/entity/post'

export type Delete = (params: {
  authorId: string;
  postId: string;
}) => Promise<{
  post: IPost;
}>;

export const buildDelete = ({ adapter }: UseCaseParams): Delete => (
  async ({ authorId, postId }) => {
    const post = await adapter.postRepository.get({
      where: {
        authorId,
        id: postId
      }
    })
    if (!post) throw new NotFoundError({message: 'Post not found'})
    
    const deletedPost = await adapter.postRepository.delete({
      where: {
        authorId,
        id: postId,
      }
    })
    
    return { post: deletedPost }
  }
);
