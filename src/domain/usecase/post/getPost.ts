import {UseCaseParams} from '../types'
import {IPost} from '@/domain/entity/post'
import {NotFoundError} from '@/domain/errors'

export type GetPost = (params: {
  postId: string;
}) => Promise<{
  post: IPost;
}>;

export const buildGetPost = ({ adapter }: UseCaseParams): GetPost => (
  async ({ postId }) => {
    const post = await adapter.postRepository.get({
      where: {
        id: postId,
      },
      include: {
        statuses: true,
        categories: true,
      }
    })
    
    if (!post) throw new NotFoundError({ message: 'Post not found' })
    
    return { post }
  }
);
