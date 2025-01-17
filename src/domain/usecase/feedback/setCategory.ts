import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {IFeedback} from '@/domain/entity/feedback'

export type SetCategory = (params: {
  feedbackId: string,
  postAuthorId: string,
  categoryId: string | null
}) => Promise<{
  feedback: IFeedback,
}>;

export const buildSetCategory = ({ adapter }: UseCaseParams): SetCategory => (
  async ({ feedbackId, postAuthorId, categoryId }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: {
        id: feedbackId,
        post: {
          authorId: postAuthorId
        }
      }
    })
    if (!feedback) throw new NotFoundError({message: 'Feedback not found.'})
    
    if (categoryId === null) {
      const updatedFeedback = await adapter.feedbackRepository.update({
        where: {
          id: feedback.id
        },
        data: {
          categoryId: null,
        }
      })
      
      return { feedback: updatedFeedback }
    }
    
    const category = await adapter.categoryRepository.get({
      where: {
        id: categoryId,
        post: {
          id: feedback.postId,
        }
      }
    })
    if (!category) throw new NotFoundError({message: 'Category not found.'})
    
    const updatedFeedback = await adapter.feedbackRepository.update(
      {
        where: {
          id: feedback.id
        },
        data: {
          categoryId
        }
      },
    )
    
    return { feedback: updatedFeedback }
  }
);
