import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {IFeedback} from '@/domain/entity/feedback'

export type Create = (params: {
  postId: string,
  authorId: string,
  createDto: {
    title: string,
    description?: string,
  }
}) => Promise<{
  feedback: IFeedback,
}>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => (
  async ({ postId, authorId, createDto }) => {
    const post = await adapter.postRepository.get({
      where: {
        id: postId,
      }
    })
    if (!post) throw new NotFoundError({message: 'Post not found'})
    
    const feedback = await adapter.feedbackRepository.create({
      data: {
        postId,
        authorId,
        ...createDto,
      }
    })
    
    return { feedback }
  }
);
