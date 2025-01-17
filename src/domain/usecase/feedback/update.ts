import {NotFoundError} from '@/domain/errors'
import {UseCaseParams} from '../types'
import {IFeedback} from '@/domain/entity/feedback'

export type Update = (params: {
  feedbackId: string,
  feedbackAuthorId: string,
  updateDto: {
    title?: string
    description?: string
  }
}) => Promise<{
  feedback: IFeedback,
}>;

export const buildUpdate = ({ adapter }: UseCaseParams): Update => (
  async ({ feedbackId, feedbackAuthorId, updateDto}) => {
    const feedback = await adapter.feedbackRepository.get({
      where: {
        id: feedbackId,
        authorId: feedbackAuthorId,
      }
    })
    if (!feedback) throw new NotFoundError({message: 'Feedback not found.'})
    
    const updatedFeedback = await adapter.feedbackRepository.update({
      where: {
        id: feedback.id,
      },
      data: {
        ...updateDto,
      }
    })
    
    return { feedback: updatedFeedback }
  }
);
