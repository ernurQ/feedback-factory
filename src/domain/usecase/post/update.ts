import {NotFoundError} from '@/domain/errors'
import {UseCaseParams} from '../types'
import {IPost} from '@/domain/entity/post'

export type Update = (params: {
  authorId: string;
  postId: string;
  updateDto: {
    update?: string
    description?: string
  }
}) => Promise<{
  post: IPost;
}>;

export const buildUpdate = ({ adapter }: UseCaseParams): Update => (
  async ({ authorId, postId, updateDto }) => {
    const post = await adapter.postRepository.get({
      where: {
        authorId,
        id: postId
      }
    })
    if (!post) throw new NotFoundError({message: 'Post not found'})
    
    const updatedPost = await adapter.postRepository.update({
      where: {
        id: postId
      },
      data: {
        ...updateDto
      }
    })
    
    return { post: updatedPost }
  }
);
