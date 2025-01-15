import {UseCaseParams} from '../types'
import {IPost} from '@/domain/entity/post'
import {UnauthorizedError} from '@/domain/errors'

export type Create = (params: {
  authorId: string;
  title: string;
  description?: string
}) => Promise<{
  post: IPost;
}>;

export const buildCreate = ({ adapter, service }: UseCaseParams): Create => (
  async ({ authorId, title, description = '' }) => {
    const user = await adapter.userRepository.get({where: {id: authorId}})
    if (!user) throw new UnauthorizedError()
    
    const post = await adapter.postRepository.create({data: {title, description, authorId}})
    await service.status.createDefaultStatuses({postId: post.id})
    
    return {post}
  }
);
