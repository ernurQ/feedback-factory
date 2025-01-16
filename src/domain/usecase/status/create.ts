import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {IStatus} from '@/domain/entity/status'

export type Create = (params: {
  postId: string,
  postAuthorId: string,
  statusName: string,
}) => Promise<{
  status: IStatus,
}>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => (
  async ({ postId, postAuthorId, statusName }) => {
    const post = await adapter.postRepository.get({
      where: {
        id: postId,
        authorId: postAuthorId
      }
    })
    if (!post) throw new NotFoundError({message: 'Post not found'})
    
    const status = await adapter.statusRepository.create({
      data: {
        postId: post.id,
        name: statusName,
      }
    })
    
    return { status }
  }
);
