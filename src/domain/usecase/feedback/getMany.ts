import {UseCaseParams} from '../types'
import {IFeedback} from '@/domain/entity/feedback'

export type GetMany = (params: {
  postId: string,
  statusId?: string,
  categoryId?: string,
}) => Promise<{
  feedbacks: Array<IFeedback>,
}>;

export const buildGetMany = ({ adapter }: UseCaseParams): GetMany => (
  async ({ postId, statusId, categoryId }) => {
    const feedbacks = await adapter.feedbackRepository.getMany({
      where: {
        postId,
        statusId,
        categoryId,
      },
      orderBy: {
        updatedAt: 'desc',
      }
    })
    
    return { feedbacks }
  }
);
