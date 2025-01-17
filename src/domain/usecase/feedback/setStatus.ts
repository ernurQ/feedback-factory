import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {IFeedback} from '@/domain/entity/feedback'

export type SetStatus = (params: {
  feedbackId: string,
  postAuthorId: string,
  statusId: string | null
}) => Promise<{
  feedback: IFeedback,
}>;

export const buildSetStatus = ({ adapter }: UseCaseParams): SetStatus => (
  async ({ feedbackId, postAuthorId, statusId }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: {
        id: feedbackId,
        post: {
          authorId: postAuthorId
        }
      }
    })
    if (!feedback) throw new NotFoundError({message: 'Feedback not found.'})
    
    if (statusId === null) {
      const updatedFeedback = await adapter.feedbackRepository.update({
        where: {
          id: feedback.id
        },
        data: {
          statusId: null,
        }
      })
      
      return { feedback: updatedFeedback }
    }
    
    const status = await adapter.statusRepository.get({
      where: {
        id: statusId,
        post: {
          id: feedback.postId,
        }
      }
    })
    if (!status) throw new NotFoundError({message: 'Status not found.'})
    
    const updatedFeedback = await adapter.feedbackRepository.update(
      {
        where: {
          id: feedback.id
        },
        data: {
          statusId
        }
      },
    )
    
    return { feedback: updatedFeedback }
  }
);
