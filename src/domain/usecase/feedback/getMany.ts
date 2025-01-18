import {UseCaseParams} from '../types'
import {IFeedback} from '@/domain/entity/feedback'

type Order = 'asc' | 'desc'

export type GetMany = (params: {
  postId: string,
  statusId?: string,
  categoryId?: string,
  orderBy?: {
    updatedAt?: Order,
    createdAt?: Order,
    votes?: Order
  }
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
      include: {
        _count: {
          select: {
            votes: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc',
      }
    })
    
    return { feedbacks }
  }
);
