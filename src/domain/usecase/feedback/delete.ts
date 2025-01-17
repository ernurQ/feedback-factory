import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {IFeedback} from '@/domain/entity/feedback'

export type Delete = (params: {
  feedbackId: string,
  userId: string,
}) => Promise<{
  feedback: IFeedback,
}>;

export const buildDelete = ({ adapter }: UseCaseParams): Delete => (
  async ({ feedbackId, userId }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: {
        id: feedbackId,
        OR: [
          {
            authorId: userId,
          },
          {
            post: {
              authorId: userId,
            }
          }
        ]
      }
    })
    if (!feedback) throw new NotFoundError({message: 'Feedback not found'})
    
    const deletedFeedback = await adapter.feedbackRepository.delete({
      where: {
        id: feedback.id
      }
    })
    
    return { feedback: deletedFeedback }
  }
);
